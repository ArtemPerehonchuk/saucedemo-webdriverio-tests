class Page {
    async navigate(path = '') {
        await browser.url(path);
    }

    async checkBrowserUrl(expectedUrl) {
        await expect(browser).toHaveUrl(expectedUrl);
    }

    // async clickOnElement(element) {
    //     await element.waitForEnabled({timeot: 5000});
    //     await element.click();
    //     await browser.pause(2000);
    // }

    // async scrollToElement(element) {
    //     await element.click();
    // }

    // async checkElementIsDisplayed(element) {
    //     await expect(await element.isDisplayed()).toBe(true);
    // }

}

export default Page;