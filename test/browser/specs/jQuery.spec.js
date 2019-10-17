const assert = require('assert');

describe('jQuery', () => {
    it('should work with jQuery', async () => {
        await browser.url('/html/jQuery.html');
        const input = await browser.$('#input');

        assert.equal(await input.getValue(), '10');

        await input.click();
        await browser.keys(['Up arrow']);

        assert.equal(await input.getValue(), '11');
    });
});
