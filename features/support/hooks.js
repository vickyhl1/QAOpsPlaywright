import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { POManager } from '../../pageObjects/POManager.js';

Before(async function () {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("I am the last to execute");
});

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});