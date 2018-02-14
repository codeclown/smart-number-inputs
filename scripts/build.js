/* globals __dirname */

'use strict';

const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const uglify = require('uglify-js');

const header = `/*
 * smart-number-inputs.js
 *
 * Increment/decrement number values in text inputs using up and down arrow keys.
 *
 * Author: Martti Laine (@codeclown)
 * License: MIT
 * URL: https://github.com/codeclown/smart-number-inputs
 */
`;

const source = path.join(__dirname, '../src/index.js');
const destination = path.join(__dirname, '../build/smart-number-inputs.js');
const minified = path.join(__dirname, '../build/smart-number-inputs.min.js');

const oldSchool = babel.transformFileSync(source, { presets: ['es2015'] });
fs.writeFileSync(destination, header + oldSchool.code);

const uglified = uglify.minify(oldSchool.code, { fromString: true });
fs.writeFileSync(minified, header + uglified.code);
