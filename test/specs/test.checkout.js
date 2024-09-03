import userData from '../helpers/userData.json' assert { type: 'json' };
import InventoryPage from '../pageobjects/inventory.page.js';
import LoginPage from '../pageobjects/login.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import CheckoutConfirmPage from '../pageobjects/checkout.confirm.page.js';
import CheckoutCompletePage from '../pageobjects/checkout.complete.page.js';
import { faker } from '@faker-js/faker';

const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutConfirmPage = new CheckoutConfirmPage();
const checkoutCompletePage = new CheckoutCompletePage();

const checkoutConfirmPageUrl = 'https://www.saucedemo.com/checkout-step-two.html';
const checkoutCompletePageUrl = 'https://www.saucedemo.com/checkout-complete.html';
const cartPageUrl = 'https://www.saucedemo.com/cart.html';

let randomFirstName;
let randomLastName;
let randomPostalCode;

describe('Test checkout page', () => {
    beforeEach(async () => {
        await loginPage.navigate('/');
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnLoginBtn();
        await browser.pause(2000);
        await inventoryPage.clickOnSauceLabsBackpackAddToCartBtn();
        await inventoryPage.clickOnCartIcon();
    });

    it('Test case SD13: Should check valid checkout', async () => {
        randomFirstName = faker.person.firstName();
        randomLastName = faker.person.lastName();
        randomPostalCode = faker.number.int({min: 1000, max: 99999});

        await cartPage.clickOnCheckoutBtn();
        await checkoutPage.fillCheckoutForm(randomFirstName, randomLastName, randomPostalCode);
        await checkoutPage.clickOnContinueBtn();

        await checkoutConfirmPage.checkBrowserUrl(checkoutConfirmPageUrl);
        await checkoutConfirmPage.checkSauceLabsBackpackProductIsDisplayed();

        await checkoutConfirmPage.clickOnFinishBtn();

        await checkoutCompletePage.checkBrowserUrl(checkoutCompletePageUrl);
        await checkoutCompletePage.checkSuccessCopleteMessage();
    });

    it('Test case SD14: Should check not continue checkout with empty input fields.', async () => {
        await cartPage.clickOnCheckoutBtn();
        await checkoutPage.clickOnContinueBtn();
        
        await checkoutPage.checkErrorMessage();

        await checkoutPage.clickOnCancelBtn();
        await cartPage.clickOnSauceLabsBackpackRemoveBtn();
    });

    it('Test case SD15: Should check cancel the checkout.', async () => {
        await cartPage.clickOnCheckoutBtn();
        await checkoutPage.clickOnCancelBtn();
        
        await inventoryPage.checkBrowserUrl(cartPageUrl);
        
        await cartPage.clickOnSauceLabsBackpackRemoveBtn();
    });

    it('Test case SD16: Should check not checkout with empty cart', async () => {
        try {
            await cartPage.clickOnSauceLabsBackpackRemoveBtn();
            await cartPage.clickOnCheckoutBtn();
            
            await cartPage.checkEmptyCartErrorMessage();
        } catch(error) {
            console.error('Error message: ', error)
        }
    });
})
