import { LoginPage } from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { CartPage } from "./CartPage.js";
import { CheckoutPage } from "./CheckoutPage.js";
import { OrdersHistoryPage } from "./OrdersHistoryPage.js";

export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }
}