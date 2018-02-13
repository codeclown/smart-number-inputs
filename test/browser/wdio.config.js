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
        platform: 'Windows 10',
        build: process.env.TRAVIS_BUILD_NUMBER
    };
    exports.config.capabilities = [
        {
            browserName: 'chrome',
            version: '64.0'
        },
        {
            browserName: 'firefox',
            version: '58.0'
        },
        {
            browserName: 'internet explorer',
            version: '11.103'
        },
        {
            browserName: 'MicrosoftEdge',
            version: '15.15063'
        },
        {
            browserName: 'safari',
            platform: 'macOS 10.13',
            version: '11.0'
        }
    ].map(specs => Object.assign({}, commonCapabilities, specs));
}
