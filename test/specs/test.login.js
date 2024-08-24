const faker = require('@faker-js/faker');
const LoginPage = require('../pageobjects/login.page.js');
const userData = require('../helpers/userData.json') //assert { type: 'json' };

const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';

let randomUsername;
let randomPassword;

const loginPage = new LoginPage();

describe('Test login page', () => {
    beforeEach(async () => {
        await loginPage.navigate('/');
    });

    it('Test case SD01: Should check login form with invalid password', async () => {
        randomPassword = faker.internet.password();

        await loginPage.fillInputs(userData.username, randomPassword);
        await loginPage.clickOnElement(loginPage.loginBtn);
        
        await loginPage.checkErrorMessage();
    });

    it('Test case SD02: Should check login form with invalid username', async () => {
        randomUsername = faker.person.firstName();

        await loginPage.fillInputs(randomUsername, userData.password);
        await loginPage.clickOnElement(loginPage.loginBtn);
        
        await loginPage.checkErrorMessage();
    });

    it('Test case SD03: Should check login form with empty username input field.', async () => {
        await loginPage.fillInputs('', userData.password);
        await loginPage.clickOnElement(loginPage.loginBtn);
        
        await loginPage.checkErrorMessage();
    });

    it('Test case SD04: Should check login form with empty password input field.', async () => {
        await loginPage.fillInputs(userData.username, '');
        await loginPage.clickOnElement(loginPage.loginBtn);
        
        await loginPage.checkErrorMessage();
    });

    it('Test case SD05: Should login with valid credentials', async () => {
        await loginPage.fillInputs(userData.username, userData.password);
        await loginPage.clickOnElement(loginPage.loginBtn);
        
        await loginPage.checkBrowserUrl(inventoryPageUrl);
    });
})