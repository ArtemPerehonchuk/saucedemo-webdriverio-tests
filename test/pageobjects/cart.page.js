const Page = require("./page.js");

class CartPage extends Page {
    get continueShoppingBtn () {return $('#continue-shopping');}
    get checkoutBtn () {return $('#checkout');}
    get emptyCartErrorMessage () {return $('[data-test="error"]');}

    async checkEmptyCartErrorMessage () {
        await expect(await this.emptyCartErrorMessage.isDisplayed()).toBe(true);
    }
}

module.exports = CartPage;