import userData from '../helpers/userData.json' assert { type: 'json' };
import CartPage from '../pageobjects/cart.page.js';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


const cartPage = new CartPage();
const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

describe('Test cart page', () => {
    beforeEach(async () => {
        await cartPage.navigate('/');
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnLoginBtn();
    });

    it('Test case SD10: Should add product to cart.', async () => {
        await inventoryPage.clickOnSauceLabsBackpackAddToCartBtn();
        await inventoryPage.checkCartIconValue('1');
        await inventoryPage.clickOnSauceLabsBackpackRemoveBtn();
    });

    it('Test case SD11: Should remove product from the cart.', async () => {
        await inventoryPage.clickOnSauceLabsBackpackAddToCartBtn();
        await inventoryPage.checkCartIconValue('1');
        await inventoryPage.clickOnSauceLabsBackpackRemoveBtn();
        await inventoryPage.checkEmptyCartIconValue();
    });

    it('Test case SD12: Should check the option to continue shopping', async () => {
        await inventoryPage.clickOnSauceLabsBackpackAddToCartBtn();
        await inventoryPage.checkCartIconValue('1');
        
        await inventoryPage.clickOnCartIcon();
        await cartPage.checkSauceLabsBackpackProductIsDisplayed();
        
        await cartPage.clickOnContinueShoppingBtn();
        
        await inventoryPage.clickOnSauceLabsBikeLightAddToCartBtn();
        await inventoryPage.checkCartIconValue('2');
        
        await inventoryPage.clickOnCartIcon();
        await cartPage.checkSauceLabsBikeLightProductIsDisplayed();
        
        await cartPage.clickOnSauceLabsBackpackRemoveBtn();
        await cartPage.clickOnSauceLabsBikeLightRemoveBtn();
    });

    it('Test case SD19: Should Check saving the cart after logout.', async () => {
        await inventoryPage.clickOnSauceLabsBackpackAddToCartBtn();
        await inventoryPage.clickOnCartIcon();

        await cartPage.checkSauceLabsBackpackProductIsDisplayed();

        await inventoryPage.clickOnHamburgerMenu();
        await inventoryPage.clickOnHamburgerMenuItem('Logout');
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnLoginBtn();
        await inventoryPage.clickOnCartIcon();
        
        await cartPage.checkSauceLabsBackpackProductIsDisplayed();

        await cartPage.clickOnSauceLabsBackpackRemoveBtn();
    });
})
