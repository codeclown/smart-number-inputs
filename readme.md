# smart-number-inputs

Increment/decrement number values in text inputs using up and down arrow keys.

[Check out the demo.](https://jsfiddle.net/sz61fnmd/2/)

![Demo](https://raw.github.com/codeclown/smart-number-inputs/master/demo.gif)


## Usage

Vanilla API:

```javascript
smartNumberInputs.enable(DOMElement element);
smartNumberInputs.enable(DOMElement[] elements);
smartNumberInputs.enable(NodeList elements);
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


## Building

```
npm run build
```


## Browser support

Modern browsers.

Utilizes `addEventListener` (if using `smartNumberInputs.enable`) and `DOMElement.setSelectionRange`. Both of these can be polyfilled if support for ancient browsers is desired.


## License

MIT
