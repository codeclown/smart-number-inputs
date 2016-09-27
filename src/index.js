;(factory => {
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

    const forEach = (list, callback) => {
        for(var i = 0; i < list.length; i++) callback(list[i]);
    };

    const fire = (element, eventName) => {
        if('createEvent' in document) {
            const event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, false, true);
            element.dispatchEvent(event);
        } else {
            element.fireEvent(`on${eventName}`);
        }
    };

    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    const DELIMITER = /([^\-\w0-9]+)/;

    const eventHandler = event => {
        if(event.which === ARROW_UP || event.which === ARROW_DOWN) {
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

            fire(input, 'change');
        }
    };

    const enable = element => {
        if(isArray(element) || element instanceof NodeList) {
            return forEach(element, enable);
        }

        on(element, 'keydown', eventHandler, false);
    };

    const modify = (value, start, end, addition) => {
        const segments = value.split(DELIMITER);

        // Will transform selection to encapsulate affected segments
        let newStart = null;
        let newEnd = null;

        let character = 0;

        for(let i = 0, originalValue; i < segments.length; i++) {
            originalValue = segments[i];
            character += originalValue.length;

            if(originalValue.match(DELIMITER)) continue;

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
