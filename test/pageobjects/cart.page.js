import Page from "./page.js";

class CartPage extends Page {
    get continueShoppingBtn () {return $('#continue-shopping');}
    get checkoutBtn () {return $('#checkout');}
    get emptyCartErrorMessage () {return $('[data-test="error"]');}
    get sauceLabsBackpackProduct () {return $('div=Sauce Labs Backpack');}
    get sauceLabsBackpackRemoveBtn () {return $('#remove-sauce-labs-backpack');}
    get sauceLabsBikeLightProduct () {return $('div=Sauce Labs Bike Light')}
    get sauceLabsBikeLightRemoveBtn () {return $('#remove-sauce-labs-bike-light');}

    async clickOnCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async clickOnSauceLabsBackpackRemoveBtn() {
        await this.sauceLabsBackpackRemoveBtn.click();
    }

    async clickOnSauceLabsBikeLightRemoveBtn() {
        await this.sauceLabsBikeLightRemoveBtn.click();
    }

    async clickOnContinueShoppingBtn() {
        await this.continueShoppingBtn.click();
    }

    async checkEmptyCartErrorMessage () {
        await expect(await this.emptyCartErrorMessage.isDisplayed()).toBe(true);
    }

    async checkSauceLabsBackpackProductIsDisplayed() {
        await expect(await this.sauceLabsBackpackProduct).toBeDisplayed();
    }

    async checkSauceLabsBikeLightProductIsDisplayed() {
        await expect(await this.sauceLabsBikeLightProduct).toBeDisplayed();
    }
}

export default CartPage;