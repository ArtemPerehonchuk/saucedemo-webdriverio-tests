const Page = require("./page.js");

class CheckoutCompletePage extends Page {
    get successCopmleteMessage () {return $('.complete-header');}

    async checkSuccessCopleteMessage () {
        await expect(await this.successCopmleteMessage.getText()).toEqual('Thank you for your order!');
    }
}

module.exports = CheckoutCompletePage;