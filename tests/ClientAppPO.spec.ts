import { expect, test, Page } from '@playwright/test';
import { customTest } from '../utils_ts/test-base.ts';
import { POManager } from '../pageObjects_ts/POManager.ts';
import dataset from '../utils/placeOrderTestData.json' with { type: 'json' };

for (const data of dataset) {
test(`@Web Client App login for - ${data.productName}`, async({page}: {page: Page}) => {
    const poManager = new POManager(page);
    const { userName, password, productName } = data;
    // const registerBtn = page.getByRole('link', { name: 'Register' });
    // await registerBtn.click();
    // await page.locator("#firstName").fill("John");
    // await page.locator("#lastName").fill("Doe");
    // await page.locator("#userEmail").fill("johnDoe@example.com");
    // await page.locator("#userMobile").fill("1234567890");
    // await page.locator("#userPassword").fill("Password123");
    // await page.locator("#confirmPassword").fill("Password123");
    // await page.locator('input[formcontrolname="required"]').check();
    // await page.getByRole('button', { name: 'Register' }).click();
    // await page.getByRole('button', { name: 'Login' }).click();
    
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.enterCountry("ind", " India");
    let orderId: any;
    orderId = await checkoutPage.SubmitAndGetOrderId();
    await dashboardPage.navigateToOrders();
    // view order
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const orderIdDetails = await ordersHistoryPage.getOrderIdDetails();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
}

customTest(`Web Client App login`, async({page}) => {
    const poManager = new POManager(page);
    const { userName, password, productName } = dataset[0];
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.navigateToCheckout();
});