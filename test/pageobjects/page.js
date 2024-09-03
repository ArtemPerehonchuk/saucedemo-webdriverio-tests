class Page {
    async navigate(path = '') {
        await browser.url(path);
    }

    async checkBrowserUrl(expectedUrl) {
        await expect(browser).toHaveUrl(expectedUrl);
    }
}

export default Page;