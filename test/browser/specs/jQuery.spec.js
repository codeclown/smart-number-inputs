const assert = require('assert');

describe('jQuery', () => {
    it('should work with jQuery', async () => {
        await browser.url('/html/jQuery.html');

        assert.equal(await browser.getValue('#input'), '10');

        await browser.click('#input');
        await browser.keys(['Up arrow']);

        assert.equal(await browser.getValue('#input'), '11');
    });
});
