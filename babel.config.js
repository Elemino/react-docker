module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "useBuiltIns": "usage",
                "debug": true
            }
        ],
        [
            "@babel/preset-stage-0",
            {
                "decoratorsLegacy": true
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from"
    ]
};