const Page = require("./page.js");

class CheckoutConfirmPage extends Page {
    get finishBtn () {return $('#finish');}
}

module.exports = CheckoutConfirmPage;