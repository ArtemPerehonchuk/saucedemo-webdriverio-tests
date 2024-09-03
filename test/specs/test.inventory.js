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
        await loginPage.clickOnLoginBtn();
    });

    it('Test case SD06: Should logout', async () => {
        await inventoryPage.clickOnHamburgerMenu()
        await inventoryPage.clickOnHamburgerMenuItem('Logout');
        
        await loginPage.checkBrowserUrl(loginPageUrl);
    });

    it('Test case SD07: Should check the sorting on the Inventory page.', async () => {
        await inventoryPage.clickOnProductSortDropDown();
        await inventoryPage.clickOnProductSortDropDownItem('nameZA');
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnProductSortDropDown();
        await inventoryPage.clickOnProductSortDropDownItem('priceLow');
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnProductSortDropDown();
        await inventoryPage.clickOnProductSortDropDownItem('priceHigh');
        await inventoryPage.checkProductsSorting();

        await inventoryPage.clickOnProductSortDropDown();
        await inventoryPage.clickOnProductSortDropDownItem('nameAZ');
        await inventoryPage.checkProductsSorting();
    });

    it('Test case SD08: Should check social media links', async () => {
        await inventoryPage.scrollToSocialMediaLinksContainer();
        await inventoryPage.clickOnSocialMediaIcon('twitter');
        await inventoryPage.checkSocialMediaLinks(twitterLink);

        await inventoryPage.clickOnSocialMediaIcon('facebook');
        await inventoryPage.checkSocialMediaLinks(facebookLink);

        await inventoryPage.clickOnSocialMediaIcon('linkedin');
        await inventoryPage.checkSocialMediaLinks(linkedinLink);
    });

    it('Test case SD09: Should open product description web page.', async () => {
        await inventoryPage.clickOnSauceLabsBackpackProduct();
        
        await inventoryPage.checkBrowserUrl(productDescriptionUrl);
    });

    it('Test case SD17: Should proceed to the "Saucelab" web site.', async () => {
        await inventoryPage.clickOnHamburgerMenu();
        await inventoryPage.clickOnHamburgerMenuItem('About');
        
        await inventoryPage.checkBrowserUrl(saucelabsUrl);
    });

    it('Test case SD18: Should check the option to back to inventory page', async () => {
        await inventoryPage.clickOnSauceLabsBackpackProduct();
        await productPage.clickOnBackToProductsBtn();
        
        await inventoryPage.checkBrowserUrl(inventoryPageUrl);
    });

    it('Test case SD20: Should check returning to all items', async () => {
        await inventoryPage.clickOnCartIcon();

        await inventoryPage.checkBrowserUrl(cartPageUrl);

        await inventoryPage.clickOnHamburgerMenu();
        await inventoryPage.clickOnHamburgerMenuItem('All Items');

        await inventoryPage.checkBrowserUrl(inventoryPageUrl);
    });
})