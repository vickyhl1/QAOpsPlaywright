import { test, expect } from "@playwright/test";


// test.describe.configure({ mode: 'serial' });
test("@Web Popup validations",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator('a.header-top-link[href*="lifetime-access"]').click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test("Screenshot & Visual comparison",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: "partialScreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual comparison",async({page})=>{
    await page.goto("https://www.google.com/");
    // first time the test will fail because the screenshot is not in the repository, but after that it will pass because the screenshot will be added to the repository
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
});