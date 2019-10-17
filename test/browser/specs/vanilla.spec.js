const assert = require('assert');

describe('vanilla', () => {
    it('should work with a single element', async () => {
        await browser.url('/html/vanilla.html');
        const input = await browser.$('#input');

        assert.equal(await input.getValue(), '10');

        await input.click();
        await browser.keys(['Up arrow']);

        assert.equal(await input.getValue(), '11');
    });

    it('should work with an array of elements', async () => {
        await browser.url('/html/vanilla-array.html');
        const input1 = await browser.$('#input1');
        const input2 = await browser.$('#input2');

        assert.equal(await input1.getValue(), '10');
        assert.equal(await input2.getValue(), '20');

        await input1.click();
        await browser.keys(['Up arrow']);
        await input2.click();
        await browser.keys(['Up arrow']);

        assert.equal(await input1.getValue(), '11');
        assert.equal(await input2.getValue(), '21');
    });

    it('should work with a NodeList', async () => {
        await browser.url('/html/vanilla-NodeList.html');
        const input1 = await browser.$('#input1');
        const input2 = await browser.$('#input2');

        assert.equal(await input1.getValue(), '10');
        assert.equal(await input2.getValue(), '20');

        await input1.click();
        await browser.keys(['Up arrow']);
        await input2.click();
        await browser.keys(['Up arrow']);

        assert.equal(await input1.getValue(), '11');
        assert.equal(await input2.getValue(), '21');
    });

    it('should work with a HTMLCollection', async () => {
        await browser.url('/html/vanilla-HTMLCollection.html');
        const input1 = await browser.$('#input1');
        const input2 = await browser.$('#input2');

        assert.equal(await input1.getValue(), '10');
        assert.equal(await input2.getValue(), '20');

        await input1.click();
        await browser.keys(['Up arrow']);
        await input2.click();
        await browser.keys(['Up arrow']);

        assert.equal(await input1.getValue(), '11');
        assert.equal(await input2.getValue(), '21');
    });

    it('should not block event listeners', async () => {
        await browser.url('/html/vanilla-events.html');
        const keydownBefore = await browser.$('div=keydown-before');
        const onkeydown = await browser.$('div=onkeydown');
        const keydownAfter = await browser.$('div=keydown-after');
        const input = await browser.$('#input');

        assert.equal(await keydownBefore.isDisplayed(), false);
        assert.equal(await onkeydown.isDisplayed(), false);
        assert.equal(await keydownAfter.isDisplayed(), false);

        await input.click();
        await browser.keys(['Up arrow']);

        assert.equal(await keydownBefore.isDisplayed(), true);
        assert.equal(await onkeydown.isDisplayed(), true);
        assert.equal(await keydownAfter.isDisplayed(), true);
    });
});
