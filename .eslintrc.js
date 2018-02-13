module.exports = {
    plugins: [
        'webdriverio'
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        'webdriverio/wdio': true,
        mocha: true
    },
    parserOptions: {
        ecmaVersion: 2017
    },
    extends: 'eslint:recommended',
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ]
    }
};
