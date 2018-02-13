# smart-number-inputs

[![Build Status](https://travis-ci.org/codeclown/smart-number-inputs.svg?branch=master)](https://travis-ci.org/codeclown/smart-number-inputs)

Increment/decrement number values in text inputs using up and down arrow keys.

[Demo](https://jsfiddle.net/sz61fnmd/2/) | [NPM](https://www.npmjs.com/package/smart-number-inputs)

![Demo](https://raw.github.com/codeclown/smart-number-inputs/master/demo.gif)


## Usage

Vanilla API:

```javascript
smartNumberInputs.enable(DOMElement element);
smartNumberInputs.enable(DOMElement[] elements);
smartNumberInputs.enable(NodeList elements);
smartNumberInputs.enable(HTMLCollection elements);
```

Manually attaching the event handler to affect dynamically created inputs using jQuery:

```javascript
$(document).on('keydown', 'input', smartNumberInputs.eventHandler);
```

NPM:

```javascript
const smartNumberInputs = require('smart-number-inputs');
```


## Running tests

```
npm test
```

Only unit tests:

```
npm run test:unit
```

Only browser tests:

```
npm run test:browser
```


## Building

```
npm run build
```


## Browser support

[![Sauce Test Status](https://saucelabs.com/browser-matrix/smart-number-inputs.svg)](https://saucelabs.com/u/smart-number-inputs)

Modern browsers.

Utilizes `addEventListener` (if using `smartNumberInputs.enable`) and `DOMElement.setSelectionRange`. Both of these can be polyfilled if support for ancient browsers is desired.


## Credits

Built by [@codeclown](https://twitter.com/codeclown) to be used in [MailDeveloper](https://maildeveloper.com?ref=smart-number-inputs).

Browser testing provided [for free](https://saucelabs.com/open-source) by Sauce Labs. Thanks!


## License

MIT
