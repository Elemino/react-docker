import pkg from './package';

import path from 'path';
import console from 'better-console';
import fs from 'fs';
import http from 'http';
import https from 'https';
import koa from 'koa';
import cors from 'kcors';
import compress from 'koa-compress';
import noTrailingSlash from 'koa-no-trailing-slash';
import rateLimit from 'koa-ratelimit';
import json from 'koa-json';
import body from 'koa-body';
import send from 'koa-send';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import sslify from 'koa-sslify';
import userAgent from 'koa-useragent';
import Router from 'koa-router';
import scheduler from 'node-schedule';

const router = Router();
const redis = null;// pkg.redis ? require('./api/redis') : null;

import APIs  from './api';
import jobs from './api/jobs';

const app = new koa();

app.use(cors());
app.use(compress());
app.use(noTrailingSlash());
app.use(json({ pretty: true, spaces: 4 }));
app.use(body({ formLimit: '1mb', jsonLimit: '1mb', strict: false, multipart: true }));
app.use(userAgent);

if(redis) {
    app.use(rateLimit({
        db: redis,
        duration: 60000,
        max: 500,
        id: ctx => ctx.ip,
    }));
}

const host = pkg.host[process.env.NODE_ENV];

if(pkg.ssl) {
    app.use(sslify({
        hostname: host.hostname,
        port: host.httpsPort || 443,
        redirectMethods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE'],
    }));
}

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch(error) {
        if (error.status === 401) {
            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic');
            ctx.body = 'Unauthorized.';
        }
        else {
            console.error(error);
            ctx.status = 400;
            ctx.body = error.message || error;
        }
    }
});

for(const mountPoint in APIs) {
    const API = APIs[mountPoint];
    router.all(`/api/${mountPoint}/:action`, async ctx => {
        const { action } = ctx.params;
        const args = { ...ctx.request.query, ...ctx.request.body };
        ctx.body = await API[action](args);
    });
}

const cacheHeaders = (res, path, stats) => {
    res.setHeader('Cache-Control', 'max-age=' + 3600 * 24 * 7);
};

router.all(['/dist/*', '/assets/*'], async ctx => {
    await send(ctx, ctx.path, { root: path.dirname('.'), setHeaders: cacheHeaders });
});

//let "/" bundle to be the let in order so it does not prevail on others
const bundles = pkg.bundles.filter(bundle => bundle.baseRoute).sort((a, b) => a.baseRoute.length <= b.baseRoute.length);

for(const bundle of bundles) {
    const { name, baseRoute, htmlOutputFilename, noIndex, prerender, ttl, identifier, secret } = bundle;

    if(identifier && secret)
        app.use(mount(baseRoute, auth({ name: identifier, pass: secret })));

    router.all([baseRoute, `${baseRoute !== '/' ? baseRoute : ''}/*`], async ctx => {
        const { protocol, host, url: pathname, userAgent: { isBot } } = ctx;
        const url = `${protocol}://${host}${pathname}`;

        await send(ctx, htmlOutputFilename || `./dist/${name}/index.html`, { root: path.dirname('.'), setHeaders: cacheHeaders });
    });
}

app.use(router.routes());

http.createServer(app.callback()).listen(host.httpPort || 80);

if(pkg.ssl)
    http.createServer({ key: fs.readFileSync(pkg.ssl.key), cert: fs.readFileSync(pkg.ssl.cert) }, app.callback()).listen(host.httpsPort || 443);

if(process.env.pm_id === '0')
    for(const time in jobs)
        scheduler.scheduleJob(time, jobs[time]);