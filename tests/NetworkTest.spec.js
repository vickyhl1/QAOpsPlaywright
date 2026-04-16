import { test, request } from '@playwright/test';
import {APIUtils} from '../utils/APIUtils';
const loginPayload = {
    "userEmail": "johnDoe@example.com",
    "userPassword": "Password123"
};
const orderPayload = {orders:[{"country":"Cuba","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
let response;
const fakePayLoadOrders = {data:[], message: "No Orders"};

test.beforeAll(async ({}) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place Order', async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://www.rahulshettyacademy.com/client/");
    await page.route("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    
                    response,
                    body,
                }
            //intercepting response - API response->{playwright fake response}->browser->render data on front end
            )
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*") // to avoid network disposal error
    console.log(await page.locator(".mt-4").textContent());
});