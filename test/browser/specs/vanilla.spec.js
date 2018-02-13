const assert = require('assert');

describe('vanilla', () => {
    it('should work with a single element', async () => {
        await browser.url('/html/vanilla.html');

        assert.equal(await browser.getValue('#input'), '10');

        await browser.click('#input');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.getValue('#input'), '11');
    });

    it('should work with an array of elements', async () => {
        await browser.url('/html/vanilla-array.html');

        assert.equal(await browser.getValue('#input1'), '10');
        assert.equal(await browser.getValue('#input2'), '20');

        await browser.click('#input1');
        await browser.keys(['Up arrow']);
        await browser.click('#input2');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.getValue('#input1'), '11');
        assert.equal(await browser.getValue('#input2'), '21');
    });

    it('should work with a NodeList', async () => {
        await browser.url('/html/vanilla-NodeList.html');

        assert.equal(await browser.getValue('#input1'), '10');
        assert.equal(await browser.getValue('#input2'), '20');

        await browser.click('#input1');
        await browser.keys(['Up arrow']);
        await browser.click('#input2');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.getValue('#input1'), '11');
        assert.equal(await browser.getValue('#input2'), '21');
    });

    it('should work with a HTMLCollection', async () => {
        await browser.url('/html/vanilla-HTMLCollection.html');

        assert.equal(await browser.getValue('#input1'), '10');
        assert.equal(await browser.getValue('#input2'), '20');

        await browser.click('#input1');
        await browser.keys(['Up arrow']);
        await browser.click('#input2');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.getValue('#input1'), '11');
        assert.equal(await browser.getValue('#input2'), '21');
    });

    it('should not block event listeners', async () => {
        await browser.url('/html/vanilla-events.html');

        assert.equal(await browser.isVisible('div=keydown-before'), false);
        assert.equal(await browser.isVisible('div=onkeydown'), false);
        assert.equal(await browser.isVisible('div=keydown-after'), false);

        await browser.click('#input');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.isVisible('div=keydown-before'), true);
        assert.equal(await browser.isVisible('div=onkeydown'), true);
        assert.equal(await browser.isVisible('div=keydown-after'), true);
    });
});
