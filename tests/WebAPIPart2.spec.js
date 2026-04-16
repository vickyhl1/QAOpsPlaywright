import { test, expect } from '@playwright/test';
let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("johnDoe@example.com");
    await page.locator("#userPassword").fill("Password123");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle'); // not needed to wait for networkidle, but it's a good practice to wait for the page to load
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({storageState: 'state.json'})
});

test('Web Client App login', async() => {
    const email = ""; 
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
    const page = await webContext.newPage();
    await page.goto("https://www.rahulshettyacademy.com/client/"); 
    await page.locator(".card-body b").first().waitFor();
    // select zara coat 3 from items
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
    // confirm product is added to cart
    await page.getByRole('listitem').getByRole('button', { name: /Cart/i }).click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('"+productName+"')").isVisible(); 
    expect(bool).toBe(true);
    // checkout
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(await page.locator(".user__name label").textContent()).toContain(email);
    await page.locator(".action__submit").click();
    expect(await page.locator(".hero-primary").textContent()).toContain(" Thankyou for the order. ");

    // view order
    const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replaceAll("|", "").trim();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();  
    await page.locator("tbody tr").filter({ hasText: orderId }).getByRole('button', { name: 'View' }).click();  
    // alternative way to view order:
    // for (let i = 0; i < await rows.count(); ++i) {
    //    const rowOrderId = await rows.nth(i).locator("th").textContent();
    //    if (orderId.includes(rowOrderId)) {
    //       await rows.nth(i).locator("button").first().click();
    //       break;
    //    }
    // }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

    test('@API Test case 2', async() => {
        const email = ""; 
        const page = await webContext.newPage();
        await page.goto("https://www.rahulshettyacademy.com/client/"); 
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
}); 