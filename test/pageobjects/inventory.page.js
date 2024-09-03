import Page from './page.js';

const twitterLink = 'https://x.com/saucelabs';
const facebookLink = 'https://www.facebook.com/saucelabs';
const linkedinLink = 'https://www.linkedin.com/company/sauce-labs/';

class InventoryPage extends Page {
    
    get hamburgerMenu () {return $('#react-burger-menu-btn');}
    get logoutItem () {return $('#logout_sidebar_link');}
    get aboutItem () {return $('#about_sidebar_link');}
    get allItemsItem () {return $('#inventory_sidebar_link');}
    get productSortDropDown () { return $('.product_sort_container');}
    get nameAZ () { return $('[value="az"]'); }
    get nameZA () { return $('[value="za"]'); }
    get priceLow () { return $('[value="lohi"]');}
    get priceHigh () { return $('[value="hilo"]');}
    get socialMediaLinksContainer () {return $('[class="social"]');}
    get twitterIcon () {return $('a=Twitter');}
    get facebookIcon () {return $('a=Facebook');}
    get linkedinIcon () {return $('a=LinkedIn');}
    get sauceLabsBackpackProduct () {return $('div=Sauce Labs Backpack');}
    get sauceLabsBikeLightProduct () {return $('div=Sauce Labs Bike Light')}
    get sauceLabsBackpackAddToCartBtn () {return $('#add-to-cart-sauce-labs-backpack');}
    get sauceLabsBackpackRemoveBtn () {return $('#remove-sauce-labs-backpack');}
    get sauceLabsBikeLightAddToCartBtn () {return $('#add-to-cart-sauce-labs-bike-light');}
    get sauceLabsBikeLightRemoveBtn () {return $('#remove-sauce-labs-bike-light');}
    get cartIcon () {return $('.shopping_cart_link');}
    get cartIconValue () {return $('[data-test="shopping-cart-badge"]');}

    async clickOnHamburgerMenu() {
        await this.hamburgerMenu.click();
        await browser.pause(1000);
    }

    async clickOnHamburgerMenuItem(item) {
        const selectHamburgerMenuItem = {
            Logout: async () => await this.logoutItem.click(),
            AllItems: async () => await this.allItemsItem.click(),
            About: async () => await this.aboutItem.click(),
        }

        await selectHamburgerMenuItem[item]();
    }

    async clickOnProductSortDropDown() {
        await this.productSortDropDown.click();
    }

    async clickOnProductSortDropDownItem(item) {
        const sortOptions = {
            nameAZ: async () => await this.nameAZ.click(),
            nameZA: async () => await this.nameZA.click(),
            priceLow: async () => await this.priceLow.click(),
            priceHigh: async () => await this.priceHigh.click()
        }
        await sortOptions[item]();
    }

    async checkProductsSorting() {
        const sortingValue = await this.productSortDropDown.getValue(); // Використовуйте getValue() для отримання значення

        const productElements = await $$('.inventory_item_name');
        const productNames = [];
        const priceElements = await $$('.inventory_item_price');
        const productPrices = [];

        for (let element of productElements) {
        productNames.push(await element.getText());
        }

        for (let element of priceElements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            productPrices.push(price);
        }
    
        const sortActions = {
            az: () => {
                const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
                expect(productNames).toEqual(sortedProductNames);
            },
            za: () => {
                const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
                expect(productNames).toEqual(sortedProductNames);
            },
            lohi: () => {
                const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
                expect(productPrices).toEqual(sortedProductPrices);
            },
            hilo: () => {
                const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
                expect(productPrices).toEqual(sortedProductPrices);
            }
        };
        
        await sortActions[sortingValue]();   
    }

    async clickOnSauceLabsBackpackAddToCartBtn() {
        await this.sauceLabsBackpackAddToCartBtn.click();
    }

    async clickOnSauceLabsBikeLightAddToCartBtn() {
        await this.sauceLabsBikeLightAddToCartBtn.click();
    }

    async clickOnSauceLabsBackpackRemoveBtn() {
        await this.sauceLabsBackpackRemoveBtn.click();
    }

    async scrollToSocialMediaLinksContainer() {
        await this.socialMediaLinksContainer.scrollIntoView();
    }

    async clickOnSocialMediaIcon(icon) {

        const selectSocialMediaIcon = {
            twitter: async () => {
                await this.twitterIcon.click();
                await browser.pause(2000);
            },
            facebook: async () => {
                await this.facebookIcon.click();
                await browser.pause(2000);
            },
            linkedin: async () => {
                await this.linkedinIcon.click();
                await browser.pause(2000);
            },
        }

        await selectSocialMediaIcon[icon]();
    }

    async checkSocialMediaLinks(link) {

        const selectSocialMediaLink = {
            [twitterLink]: async () => {
                await this.twitterIcon.click();
                await browser.pause(1000);
            },
            [facebookLink]: async () => {
                await this.facebookIcon.click();
                await browser.pause(1000);
            },
            [linkedinLink]: async () => {
                await this.linkedinIcon.click();
                await browser.pause(1000);
            }
        }

        await selectSocialMediaLink[link]();
        
        await browser.pause(2000);
        await browser.switchWindow(link)
        await expect(browser).toHaveUrlContaining(link);
        await browser.closeWindow();
        await browser.switchWindow('/inventory.html');
    }

    async clickOnSauceLabsBackpackProduct() {
        await this.sauceLabsBackpackProduct.click();
    }

    async clickOnSauceLabsBikeLightProduct() {
        await this.sauceLabsBikeLightProduct.click();
    }

    async clickOnCartIcon() {
        await this.cartIcon.click();
    }

    async checkCartIconValue(value) {
        await expect(await this.cartIconValue.getText()).toBe(value);
    }

    async checkEmptyCartIconValue() {
        await expect(await this.cartIconValue.isDisplayed()).toBe(false);
    }
}

export default InventoryPage;