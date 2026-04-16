import { test, expect, request } from '@playwright/test';
import {APIUtils} from '../utils/APIUtils';
const loginPayload = {
    "userEmail": "johnDoe@example.com",
    "userPassword": "Password123"
};
const orderPayload = {orders:[{"country":"Cuba","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
let response;

test.beforeAll(async ({}) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('@API Place Order', async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Password123");
    // await page.getByRole('button', { name: 'Login' }).click();
    // await page.waitForLoadState('networkidle'); // not needed to wait for networkidle, but it's a good practice to wait for the page to load
    await page.goto("https://www.rahulshettyacademy.com/client/");
    // add product to cart without API:
    // const email = "johnDoe@example.com";
    // await page.locator(".card-body b").first().waitFor();
    // // select zara coat 3 from items
    // const products = page.locator(".card-body");
    // const productName = 'ZARA COAT 3';
    // const count = await products.count();
    // for (let i = 0; i < count; ++i) {
    //    if (await products.nth(i).locator("b").textContent() === productName) {
    //       //add to cart
    //       await products.nth(i).locator("text= Add To Cart").click();
    //       break;
    //    }
    // }
    // confirm product is added to cart
    // await page.getByRole('listitem').getByRole('button', { name: /Cart/i }).click();
    // await page.locator("div li").first().waitFor();
    // const bool = await page.locator("h3:has-text('"+productName+"')").isVisible(); 
    // expect(bool).toBe(true);
    // // checkout
    // await page.locator("text=Checkout").click();
    // await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();
    // for(let i = 0; i < optionsCount; ++i) {
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if(text === " India") {
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    // expect(await page.locator(".user__name label").textContent()).toContain(email);
    // await page.locator(".action__submit").click();
    // expect(await page.locator(".hero-primary").textContent()).toContain(" Thankyou for the order. ");

    // view order
    // const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replaceAll("|", "").trim();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();  
    await page.locator("tbody tr").filter({ hasText: response.orderId }).getByRole('button', { name: 'View' }).click();  
    // alternative way to view order:
    // for (let i = 0; i < await rows.count(); ++i) {
    //    const rowOrderId = await rows.nth(i).locator("th").textContent();
    //    if (orderId.includes(rowOrderId)) {
    //       await rows.nth(i).locator("button").first().click();
    //       break;
    //    }
    // }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
});