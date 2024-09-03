import Page from "./page.js";

class ProductPage extends Page {
    get backToProductsBtn () {return $('#back-to-products');}

    async clickOnBackToProductsBtn() {
        await this.backToProductsBtn.click();
    }
}

export default ProductPage;