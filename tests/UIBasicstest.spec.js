import { test, expect } from '@playwright/test';

test('@Web Browser Context-Validating Error login', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.route('**/*.{jpg, png, jpeg}', route => route.abort());
    const userName = page.locator("#username")
    const sighnInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
    page.on('request', request => {
        console.log(request.url());
    });
    page.on('response', response => { 
        console.log(response.url(), response.status());
    });
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("#password").fill("Learning@830$3mK2");
    await sighnInBtn.click();
    console.log("Text is: " + await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toHaveText("Incorrect username/password.");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await sighnInBtn.click();
    //                                         a is the tag of the child
    console.log(await page.locator(".card-body a").nth(0).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('@Web UI Controls', async({page}) => {
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")
    await page.getByRole('radio', { name: 'User' }).click();
    await page.locator("#okayBtn").click();
    console.log(await page.getByRole('radio', { name: 'User' }).isChecked());
    await expect(page.getByRole('radio', { name: 'User' })).toBeChecked();
    await page.getByRole('checkbox', { name: /I Agree to the/i }).check();
    await expect(page.getByRole('checkbox', { name: /I Agree to the/i })).toBeChecked();
    await page.getByRole('checkbox', { name: /I Agree to the/i }).uncheck();
    expect(await page.getByRole('checkbox', { name: /I Agree to the/i }).isChecked()).toBeFalsy();
    // assert some locator is blinking, we'll check it's class name contains 'blinking'
    const link = page.getByRole('link', { name: /Free Access to/i });
    await expect(link).toHaveAttribute('class', 'blinkingText');
    // await page.pause();
}); 

test('Child Window handle', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username")
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.getByRole('link', { name: /Free Access to/i });
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen to any new page being opened
        documentLink.click() // new page is opened when the listener is listening already
    ]);
    const text = await newPage.locator('p.im-para.red').textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
});