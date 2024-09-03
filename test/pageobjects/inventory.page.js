import Page from './page.js';

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
        if(item === 'Logout') {
            await this.logoutItem.click();
        } else if(item === 'About') {
            await this.aboutItem.click();
        } else if(item === 'All Items') {
            await this.allItemsItem.click();
        }
    }

    async clickOnProductSortDropDown() {
        await this.productSortDropDown.click();
    }

    async clickOnProductSortDropDownItem(item) {
        if(item === 'nameAZ') {
            await this.nameAZ.click();
        } else if(item === 'nameZA') {
            await this.nameZA.click();
        } else if(item === 'priceLow') {
            await this.priceLow.click();
        } else if(item === 'priceHigh') {
            await this.priceHigh.click();
        }
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
    
        if (sortingValue === 'az') {
            const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
            expect(productNames).toEqual(sortedProductNames);
        } else if (sortingValue === 'za') {
            const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
            expect(productNames).toEqual(sortedProductNames);
        } else if (sortingValue === 'lohi') {
            const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).toEqual(sortedProductPrices);
        } else if (sortingValue === 'hilo') {
            const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).toEqual(sortedProductPrices);
        }
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
        if(icon === 'twitter') {
            await this.twitterIcon.click();
            await browser.pause(2000);
        } else if(icon === 'facebook') {
            await this.facebookIcon.click();
            await browser.pause(2000);
        } else if(icon === 'linkedin') {
            await this.linkedinIcon.click();
            await browser.pause(2000);
        } 
    }

    async checkSocialMediaLinks(link) {
        if(link === 'https://x.com/saucelabs') {
            await this.twitterIcon.click();
        } else if(link === 'https://www.facebook.com/saucelabs') {
            await this.facebookIcon.click();
        } else if (link === 'https://www.linkedin.com/company/sauce-labs/') {
            await this.linkedinIcon.click();
        }
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