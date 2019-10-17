/* globals process */
/* eslint-disable no-console */

const express = require('express');

let server;

exports.config = {
    services: ['selenium-standalone'],
    specs: [
        'test/browser/specs/**'
    ],
    maxInstances: 10,
    capabilities: [
        {
            browserName: 'chrome'
        }
    ],
    baseUrl: 'http://localhost:8080',
    framework: 'mocha',
    reporters: ['spec'],
    logLevel: process.argv.includes('--verbose') ? 'verbose' : 'silent',
    onPrepare: () => {
        const app = express();
        app.use('/build', express.static('./build'));
        app.use('/html', express.static('./test/browser/html'));
        console.log('Starting server');
        server = app.listen(8080, () => {
            console.log('Listening on 8080');
        });
    },
    onComplete: () => {
        console.log('Closing server');
        server.close();
    }
};

if (process.env.TRAVIS) {
    exports.config.services = ['sauce'];
    exports.config.user = process.env.SAUCE_USERNAME;
    exports.config.key = process.env.SAUCE_ACCESS_KEY;
    exports.config.sauceConnect = true;

    const commonCapabilities = {
        build: process.env.TRAVIS_BUILD_NUMBER,
        public: true
    };
    exports.config.capabilities = [
        {
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '61'
        },
        {
            browserName: 'firefox',
            version: '52'
        },
        {
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '10.0'
        },
        {
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: '16.16299'
        },
        {
            browserName: 'safari',
            platform: 'macOS 10.13',
            version: '11.1'
        }
    ].map(specs => Object.assign({}, commonCapabilities, specs));
}
