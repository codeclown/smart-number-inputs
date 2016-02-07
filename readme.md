# smart-number-inputs.js

Increment/decrement number values in text inputs using up and down arrow keys.


## Usage

Vanilla API:

```
smartNumberInputs.enable(DOMElement element);
smartNumberInputs.enable(DOMElement[] elements);
smartNumberInputs.enable(NodeList elements);
```

Manually attaching the event handler to affect dynamically created inputs using jQuery:

```
$(document).on('keydown', 'input', smartNumberInputs.eventHandler);
```


## Running tests

```
node test.js
```


## Building

```
node build.js
```


## Browser support

Modern browsers.

Utilizes `Array.forEach`, `addEventListener` and `DOMElement.setSelectionRange`. All of these can be polyfilled if support for ancient browsers is desired.


## License

MIT
