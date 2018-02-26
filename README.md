# YARSK

Handle everything through your package.json and never bother editing your webpack.config.js again.

## Usage
```
git clone git@github.com:damianobarbati/yarsk.git
yarn install
yarn serve:dev #fire pm2 to serve the app
yarn build:dev #fire webpack to build the app
```

Define supported browsers and app bundles into `package.json`:
```
"browserslist": [
    "chrome 64",
    "firefox 58",
    "safari 11.1",
    "ios_saf 11.3",
    "edge 17"
],
"bundles": [
    {
        "name": "visitor",
        "baseRoute": "/",
        "js": "./apps/visitor/index.js",
        "html": "./apps/index.html",
        "favicon": "./logo.png",
        "manifest": {
            ...https://developer.mozilla.org/en-US/docs/Web/Manifest            
        },
        "name": "admin",
        "baseRoute": "/admin",
        "js": "./apps/admin/index.js",
        "html": "./apps/index.html",
        "favicon": "./logo.png",
        "manifest": {
            ...https://developer.mozilla.org/en-US/docs/Web/Manifest            
        },
    }
],
```

Favicon is not required but always recommended.
Manifest is not required but recommended for SPAs.

## Todo
### minification
- uglify-es is broken https://github.com/mishoo/UglifyJS2/issues/2842
- babel-minify works but is 3x slower (24s vs 9s) and with broken sourcemaps https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68
- `--optimize-minimize=0` does not work, uglify-es is fired anyway
- currently we have to: 1) use `mode=development` to not fire broken uglify-es 2) disable sourcemaps in production