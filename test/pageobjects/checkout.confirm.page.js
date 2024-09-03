import Page from "./page.js";

class CheckoutConfirmPage extends Page {
    get finishBtn () {return $('#finish');}
    get sauceLabsBackpackProduct () {return $('div=Sauce Labs Backpack');}

    async clickOnFinishBtn() {
        await this.finishBtn.click();
    }

    async checkSauceLabsBackpackProductIsDisplayed() {
        await expect(await this.sauceLabsBackpackProduct).toBeDisplayed();
    }
}

export default CheckoutConfirmPage;