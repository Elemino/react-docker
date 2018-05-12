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
`favicon` is not required but always recommended.
`manifest` is not required but recommended for SPAs.

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