const Page = require('./page.js');

class ProductPage extends Page {
    get backToProductsBtn () {return $('#back-to-products');}
}

module.exports = ProductPage;