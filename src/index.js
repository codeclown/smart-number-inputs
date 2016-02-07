;((factory) => {
    if(typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window['smartNumberInputs'] = factory();
    }
})(() => {
    'use strict';

    const isArray = variable => Object.prototype.toString.call(variable) === '[object Array]';

    const on = (element, event, callback) => element.addEventListener(event, callback);

    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    const WHITESPACE = /(\s+)/;

    const eventHandler = event => {
        if(event.which !== ARROW_UP && event.which !== ARROW_DOWN) return;

        event.preventDefault();

        const input = event.currentTarget;

        const value = input.value;
        const start = input.selectionStart;
        const end = input.selectionEnd;

        let addition = event.which === ARROW_UP ? 1 : -1;
        if(event.shiftKey) addition *= 10;

        const modified = modify(value, start, end, addition);

        input.value = modified.value;
        input.setSelectionRange(modified.start, modified.end);
    };

    const enable = element => {
        if(isArray(element)) {
            return element.forEach(enable);
        }

        if(element instanceof NodeList) {
            return Array.prototype.forEach.call(element, enable);
        }

        on(element, 'keydown', eventHandler, false);
    };

    const modify = (value, start, end, addition) => {
        const segments = value.toString().split(WHITESPACE);
        
        // Will transform selection to encapsulate affected segments
        let newStart = null;
        let newEnd = null;

        let character = 0;

        for(let i = 0, len = segments.length, originalValue; i < len; i++) {
            originalValue = segments[i];
            character += originalValue.length;

            if(originalValue.match(WHITESPACE)) continue;

            if(character >= start) {
                if(newStart === null) newStart = character - originalValue.length;
                segments[i] = originalValue.replace(/\-?[0-9]+/, parseInt(originalValue.replace(/^.*?(\-?[0-9]+).*/, '$1'), 10) + addition);
            }

            character -= originalValue.length - segments[i].length;
            end -= originalValue.length - segments[i].length;

            if(character >= end) {
                newEnd = character;
                break;
            }
        }

        return {
            value: segments.join(''),
            start: newStart,
            end: newEnd
        };
    };

    return { eventHandler, enable, modify };
});
