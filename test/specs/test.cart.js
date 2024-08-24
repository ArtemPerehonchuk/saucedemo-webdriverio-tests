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
        await loginPage.clickOnElement(loginPage.loginBtn);
    });

    it('Test case SD10: Should add product to cart.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackAddToCartBtn);
        await inventoryPage.checkCartIconValue('1');
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackRemoveBtn);
    });

    it('Test case SD11: Should remove product from the cart.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackAddToCartBtn);
        await inventoryPage.checkCartIconValue('1');
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackRemoveBtn);
        await inventoryPage.checkEmptyCartIconValue();
    });

    it('Test case SD12: Should check the option to continue shopping', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackAddToCartBtn);
        await inventoryPage.checkCartIconValue('1');
        
        await inventoryPage.clickOnElement(inventoryPage.cartIcon);
        await cartPage.checkElementIsDisplayed(inventoryPage.sauceLabsBackpackProduct);
        
        await cartPage.clickOnElement(cartPage.continueShoppingBtn);
        
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBikeLightAddToCartBtn);
        await inventoryPage.checkCartIconValue('2');
        
        await inventoryPage.clickOnElement(inventoryPage.cartIcon);
        await cartPage.checkElementIsDisplayed(inventoryPage.sauceLabsBikeLightProduct);
        
        await cartPage.clickOnElement(inventoryPage.sauceLabsBikeLightRemoveBtn);
        await cartPage.clickOnElement(inventoryPage.sauceLabsBackpackRemoveBtn);
    });

    it('Test case SD19: Should Check saving the cart after logout.', async () => {
        await inventoryPage.clickOnElement(inventoryPage.sauceLabsBackpackAddToCartBtn);
        await inventoryPage.clickOnElement(inventoryPage.cartIcon);

        await cartPage.checkElementIsDisplayed(inventoryPage.sauceLabsBackpackProduct);

        await cartPage.clickOnElement(inventoryPage.hamburgerMenu);
        await cartPage.clickOnElement(inventoryPage.logoutItem);
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnElement(loginPage.loginBtn);
        await inventoryPage.clickOnElement(inventoryPage.cartIcon);
        
        await cartPage.checkElementIsDisplayed(inventoryPage.sauceLabsBackpackProduct);

        await cartPage.clickOnElement(inventoryPage.sauceLabsBackpackRemoveBtn);
    });
})
