/*
 * smart-number-inputs.js
 *
 * Increment/decrement number values in text inputs using up and down arrow keys.
 *
 * Author: Martti Laine (@codeclown)
 * License: MIT
 * URL: https://github.com/codeclown/smart-number-inputs
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global define */
(function (factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window['smartNumberInputs'] = factory();
    }
})(function () {
    'use strict';

    var isArray = function isArray(variable) {
        return Object.prototype.toString.call(variable) === '[object Array]';
    };

    var on = function on(element, event, callback) {
        return element.addEventListener(event, callback);
    };

    var forEach = function forEach(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i]);
        }
    };

    var fire = function fire(element, eventName) {
        if ('createEvent' in document) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, false, true);
            element.dispatchEvent(event);
        } else {
            element.fireEvent('on' + eventName);
        }
    };

    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var DELIMITER = /([^\-\w0-9]+)/;

    var eventHandler = function eventHandler(event) {
        if (event.which === ARROW_UP || event.which === ARROW_DOWN) {
            event.preventDefault();

            var input = event.currentTarget;

            var value = input.value;
            var start = input.selectionStart;
            var end = input.selectionEnd;

            var addition = event.which === ARROW_UP ? 1 : -1;
            if (event.shiftKey) addition *= 10;

            var modified = modify(value, start, end, addition);

            input.value = modified.value;
            input.setSelectionRange(modified.start, modified.end);

            fire(input, 'change');
        }
    };

    var enable = function enable(element) {
        if (isArray(element) || element instanceof NodeList || element instanceof HTMLCollection) {
            return forEach(element, enable);
        }

        on(element, 'keydown', eventHandler, false);
    };

    var modify = function modify(value, start, end, addition) {
        var segments = value.split(DELIMITER);

        // Will transform selection to encapsulate affected segments
        var newStart = null;
        var newEnd = null;

        var character = 0;

        for (var i = 0, originalValue; i < segments.length; i++) {
            originalValue = segments[i];
            character += originalValue.length;

            if (originalValue.match(DELIMITER)) continue;

            if (character >= start) {
                if (newStart === null) newStart = character - originalValue.length;
                segments[i] = originalValue.replace(/-?[0-9]+/, parseInt(originalValue.replace(/^.*?(-?[0-9]+).*/, '$1'), 10) + addition);
            }

            character -= originalValue.length - segments[i].length;
            end -= originalValue.length - segments[i].length;

            if (character >= end) {
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

    return {
        // Public API
        eventHandler: eventHandler,
        enable: enable,
        // For testing purposes
        modify: modify
    };
});