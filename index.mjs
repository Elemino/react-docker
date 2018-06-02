import pkg from './package';

import console from 'better-console';
import path from 'path';
import fs from 'fs';
import http1 from 'http';
import http2 from 'http2';
import koa from 'koa';
import cors from 'kcors';
import compress from 'koa-compress';
import noTrailingSlash from 'koa-no-trailing-slash';
import json from 'koa-json';
import body from 'koa-body';
import send from 'koa-send';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import sslify from 'koa-sslify';
import userAgent from 'koa-useragent';
import Router from 'koa-router';
import scheduler from 'node-schedule';

import APIs from './api';

const app = new koa();
const router = Router();

app.use(cors());
app.use(compress());
app.use(noTrailingSlash());
app.use(json({ pretty: true, spaces: 4 }));
app.use(body({ formLimit: '1mb', jsonLimit: '1mb', strict: false, multipart: true }));
app.use(userAgent);

const host = pkg.host[process.env.NODE_ENV];

app.use(sslify({
    hostname: host.hostname,
    port: host.httpsPort || 443,
    redirectMethods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE'],
}));

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
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
    res.setHeader('Cache-Control', 'must-revalidate, max-age=' + 3600 * 24 * 7);
};

router.all(['/dist/*', '/assets/*'], async ctx => {
    await send(ctx, ctx.path, { root: path.dirname('.'), setHeaders: cacheHeaders });
});

//let "/" bundle to be the let in order so it does not prevail on others
const bundles = pkg.bundles.filter(bundle => bundle.baseRoute).sort((a, b) => a.baseRoute.length <= b.baseRoute.length);

for(const bundle of bundles) {
    const { name, baseRoute, identifier, secret } = bundle;

    if(identifier && secret)
        app.use(mount(baseRoute, auth({ name: identifier, pass: secret })));

    router.all([baseRoute, `${baseRoute !== '/' ? baseRoute : ''}/*`], async ctx => {
        await send(ctx, `./dist/${name}/index.html`, { root: path.dirname('.'), setHeaders: cacheHeaders });
    });
}

app.use(router.routes());

const http1Server = http1.createServer(app.callback()).listen(host.httpPort || 80);
const http2Server = http2.createSecureServer({ key: fs.readFileSync(pkg.ssl.key), cert: fs.readFileSync(pkg.ssl.cert) }, app.callback()).listen(host.httpsPort || 443);

if(process.env.pm_id === '0')
    if(APIs.jobs)
        for(const time in APIs.jobs)
            scheduler.scheduleJob(time, APIs.jobs[time]);