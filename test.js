'use strict';

const test = require('tape');
const modify = require('./src').modify;

test('value', t => {
    t.equal(modify('20', 0, 0, 1).value, '21');
    t.equal(modify('20', 1, 1, 1).value, '21');
    t.equal(modify('20', 2, 2, 1).value, '21');
    t.equal(modify('20', 0, 1, 1).value, '21');
    t.equal(modify('20', 0, 2, 1).value, '21');
    t.equal(modify('20', 1, 2, 1).value, '21');

    t.equal(modify('20', 0, 0, -1).value, '19');
    t.equal(modify('20', 0, 0, 10).value, '30');
    t.equal(modify('20', 0, 0, -10).value, '10');

    t.equal(modify('20 15', 0, 0, 1).value, '21 15');
    t.equal(modify('20 15', 1, 1, 1).value, '21 15');
    t.equal(modify('20 15', 2, 2, 1).value, '21 15');
    t.equal(modify('20 15', 3, 3, 1).value, '20 16');
    t.equal(modify('20 15', 4, 4, 1).value, '20 16');
    t.equal(modify('20 15', 5, 5, 1).value, '20 16');
    t.equal(modify('20 15', 0, 4, 1).value, '21 16');
    t.equal(modify('20 15', 0, 5, 1).value, '21 16');
    t.equal(modify('20 15', 1, 4, 1).value, '21 16');
    t.equal(modify('20 15', 1, 5, 1).value, '21 16');

    t.equal(modify('20px', 0, 0, 1).value, '21px');
    t.equal(modify('20px', 1, 1, 1).value, '21px');
    t.equal(modify('20px', 2, 2, 1).value, '21px');
    t.equal(modify('20px', 3, 3, 1).value, '21px');
    t.equal(modify('20px', 4, 4, 1).value, '21px');

    t.equal(modify('px20', 0, 0, 1).value, 'px21');
    t.equal(modify('px20', 1, 1, 1).value, 'px21');
    t.equal(modify('px20', 2, 2, 1).value, 'px21');
    t.equal(modify('px20', 3, 3, 1).value, 'px21');
    t.equal(modify('px20', 4, 4, 1).value, 'px21');

    t.equal(modify('20px5', 0, 0, 1).value, '21px5');
    t.equal(modify('20px5', 1, 1, 1).value, '21px5');
    t.equal(modify('20px5', 2, 2, 1).value, '21px5');
    t.equal(modify('20px5', 3, 3, 1).value, '21px5');
    t.equal(modify('20px5', 4, 4, 1).value, '21px5');
    t.equal(modify('20px5', 5, 5, 1).value, '21px5');

    t.equal(modify('-10', 0, 0, 1).value, '-9');
    t.equal(modify('-10', 1, 1, 1).value, '-9');
    t.equal(modify('-10', 2, 2, 1).value, '-9');

    t.equal(modify('foo', 0, 0, 1).value, 'foo');
    t.equal(modify('foo', 1, 1, 1).value, 'foo');
    t.equal(modify('foo', 2, 2, 1).value, 'foo');

    t.equal(modify('10:15', 0, 0, 1).value, '11:15');
    t.equal(modify('10:15', 1, 1, 1).value, '11:15');
    t.equal(modify('10:15', 2, 2, 1).value, '11:15');
    t.equal(modify('10:15', 3, 3, 1).value, '10:16');
    t.equal(modify('10:15', 4, 4, 1).value, '10:16');
    t.equal(modify('10:15', 5, 5, 1).value, '10:16');
    t.equal(modify('10:15', 0, 5, 1).value, '11:16');
    t.equal(modify('10:15', 1, 3, 1).value, '11:16');

    t.end();
});

test('selection', t => {
    t.equal(modify('20', 1, 1, 1).start, 0);
    t.equal(modify('20', 1, 1, 1).end, 2);

    t.equal(modify('20 20 20', 4, 4, 1).start, 3);
    t.equal(modify('20 20 20', 4, 4, 1).end, 5);

    t.equal(modify('20 20 20', 3, 5, 1).start, 3);
    t.equal(modify('20 20 20', 3, 5, 1).end, 5);

    t.equal(modify('20 20 20', 3, 7, 1).start, 3);
    t.equal(modify('20 20 20', 3, 7, 1).end, 8);

    t.equal(modify('20 -1 20', 4, 4, 1).start, 3);
    t.equal(modify('20 -1 20', 4, 4, 1).end, 4);

    t.equal(modify('20 -1 20', 3, 5, 1).start, 3);
    t.equal(modify('20 -1 20', 3, 5, 1).end, 4);

    t.equal(modify('10:15', 1, 1, 1).start, 0);
    t.equal(modify('10:15', 1, 1, 1).end, 2);

    t.equal(modify('10:15', 3, 3, 1).start, 3);
    t.equal(modify('10:15', 3, 3, 1).end, 5);

    t.equal(modify('10:15', 1, 3, 1).start, 0);
    t.equal(modify('10:15', 1, 3, 1).end, 5);

    t.end();
});
