import { Given, When, Then } from '@cucumber/cucumber';
import {POManager} from '../../pageObjects/POManager.js';
import { expect, chromium } from '@playwright/test';

Given('a login to Ecommerce application with {string} and {string}',{timeout: 100*1000}, async function (userName, password) {
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);
});

When('Add {string} to cart', {timeout: 100*1000}, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.navigateToCheckout();
});

When('Enter valid details and Place the order', async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.enterCountry("ind", " India");
    this.orderId = await checkoutPage.SubmitAndGetOrderId();
});

Then('Verify order is present in orders history', async function () {
    await this.dashboardPage.navigateToOrders();
    // view order
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    const orderIdDetails = await ordersHistoryPage.getOrderIdDetails();
    expect(this.orderId.includes(orderIdDetails)).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', {timeout: 100*1000}, async function (userName, password) {
    const userNameInput = this.page.locator("#username")
    const sighnInBtn = this.page.locator("#signInBtn")
    await this.page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userNameInput.fill(userName);
    await this.page.locator("#password").fill(password);
    await sighnInBtn.click();
    console.log("Text is: " + await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
});

Then('verify error message is displayed', async function () {
    console.log("Text is: " + await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
});
