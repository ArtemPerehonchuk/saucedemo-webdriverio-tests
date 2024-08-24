import userData from '../helpers/userData.json' assert { type: 'json' };
import InventoryPage from '../pageobjects/inventory.page.js';
import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/product.page.js'

const loginPageUrl = 'https://www.saucedemo.com/';
const twitterLink = 'https://x.com/saucelabs';
const facebookLink = 'https://www.facebook.com/saucelabs';
const linkedinLink = 'https://www.linkedin.com/company/sauce-labs/';
const productDescriptionUrl = 'https://www.saucedemo.com/inventory-item.html?id=4';
const saucelabsUrl = 'https://saucelabs.com/';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';

const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();
const productPage = new ProductPage();

describe('Test inventory page', () => {
    beforeEach(async () => {
        await loginPage.navigate('/');
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnElement(loginPage.loginBtn);
    });

    it('Test case SD06: Should logout', async () => {
        await inventoryPage.clickOnElement(inventoryPage.hamburgerMenu);
        await inventoryPage.clickOnElement(inventoryPage.logoutItem);
        
        await loginPage.checkBrowserUrl(loginPageUrl);
    });

    it('Test case SD07: Should check the sorting on the Inventory page.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.productSortDropDown);
        await inventoryPage.clickOnElement(inventoryPage.nameZA);
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnElement(inventoryPage.productSortDropDown);
        await inventoryPage.clickOnElement(inventoryPage.priceHigh);
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnElement(inventoryPage.productSortDropDown);
        await inventoryPage.clickOnElement(inventoryPage.priceLow);
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnElement(inventoryPage.productSortDropDown);
        await inventoryPage.clickOnElement(inventoryPage.nameAZ);
        await inventoryPage.checkProductsSorting();
    });

    it('Test case SD08: Should check social media links', async () => {
        await inventoryPage.scrollToElement(inventoryPage.socialMediaLinksContainer);
        await inventoryPage.clickOnElement(inventoryPage.twitterIcon);
        await inventoryPage.checkSocialMediaLinks(twitterLink);

        await inventoryPage.clickOnElement(inventoryPage.facebookIcon);
        await inventoryPage.checkSocialMediaLinks(facebookLink);

        await inventoryPage.clickOnElement(inventoryPage.linkedinIcon);
        await inventoryPage.checkSocialMediaLinks(linkedinLink);
    });

    it('Test case SD09: Should open product description web page.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackProduct);
        
        await inventoryPage.checkBrowserUrl(productDescriptionUrl);
    });

    it('Test case SD17: Should proceed to the "Saucelab" web site.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.hamburgerMenu);
        await inventoryPage.clickOnElement(inventoryPage.aboutItem);
        
        await inventoryPage.checkBrowserUrl(saucelabsUrl);
    });

    it('Test case SD18: Should check the option to back to inventory page', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackProduct);
        await productPage.clickOnElement(productPage.backToProductsBtn);
        
        await inventoryPage.checkBrowserUrl(inventoryPageUrl);
    });

    it('Test case SD20: Should check returning to all items', async () => {
        await inventoryPage.clickOnElement(inventoryPage.cartIcon);

        await inventoryPage.checkBrowserUrl(cartPageUrl);

        await inventoryPage.clickOnElement(inventoryPage.hamburgerMenu);
        await inventoryPage.clickOnElement(inventoryPage.allItemsItem);

        await inventoryPage.checkBrowserUrl(inventoryPageUrl);
    });
})