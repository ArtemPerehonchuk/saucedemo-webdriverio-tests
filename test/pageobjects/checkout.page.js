import Page from "./page.js";

class CheckoutPage extends Page {
    get firstNameInput () {return $('#first-name');}
    get lastNameInput () {return $('#last-name');}
    get postakCodeInput () {return $('#postal-code');}
    get continueBtn () {return $('#continue');}
    get cancelBtn () {return $('#cancel');}
    get checkoutErrorMessage () {return $('[data-test="error"]');}

    async fillCheckoutForm (firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postakCodeInput.setValue(postalCode);
    }

    async checkErrorMessage () {
        await expect(await this.checkoutErrorMessage.isDisplayed()).toBe(true);
        await expect(this.checkoutErrorMessage).toHaveTextContaining('Error:');
        
        const firstNameBorderColor = await this.firstNameInput.getCSSProperty('border-bottom-color');
        const lastNameBorderColor = await this.lastNameInput.getCSSProperty('border-bottom-color');
        const postalCodeBorderColor = await this.postakCodeInput.getCSSProperty('border-bottom-color');

        if(browser.capabilities.browserName === 'chrome') {
            await expect(firstNameBorderColor.value).toBe('rgba(226,35,26,1)');
            await expect(lastNameBorderColor.value).toBe('rgba(226,35,26,1)');
            await expect(postalCodeBorderColor.value).toBe('rgba(226,35,26,1)');
        } else if (browser.capabilities.browserName === 'firefox') {
            await expect(firstNameBorderColor.value).toBe('rgb(226,35,26)');
            await expect(lastNameBorderColor.value).toBe('rgb(226,35,26)');
            await expect(postalCodeBorderColor.value).toBe('rgb(226,35,26)');
        }
    }
}

export default CheckoutPage;