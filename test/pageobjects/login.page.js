import Page from './page.js';

class LoginPage extends Page {
    get usernameInput () {return $('#user-name');}
    get passwordInput () {return $('#password');}
    get loginBtn () {return $('#login-button');}
    get errorMesage () {return $('[data-test="error"]');}

    async fillInputs(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
    }

    async clickOnLoginBtn() {
        await this.loginBtn.click();
    }

    async checkErrorMessage() {
        const browserName = browser.capabilities.browserName;
        console.log('BROWSER NAME IS: ', browserName)

        await expect(this.errorMesage).toBeDisplayed();
        await expect(this.errorMesage).toHaveTextContaining('Epic sadface:');
        const usernameBorderColor = await this.usernameInput.getCSSProperty('border-bottom-color');
        const passwordBorderColor = await this.passwordInput.getCSSProperty('border-bottom-color');
    
        if(browser.capabilities.browserName === 'chrome') {
            await expect(usernameBorderColor.value).toBe('rgba(226,35,26,1)');
            await expect(passwordBorderColor.value).toBe('rgba(226,35,26,1)');
        } else if(browser.capabilities.browserName === 'firefox') {
            await expect(usernameBorderColor.value).toBe('rgb(226,35,26)');
            await expect(passwordBorderColor.value).toBe('rgb(226,35,26)');
        }
    }

    async checkLoginPageUrl(expectedUrl) {
        await expect(browser).toHaveUrl(expectedUrl);
    }
}

export default LoginPage;