import { Locator, Page } from '@playwright/test';
export class LoginPage {
    page: Page;
    signInBtn: Locator;
    userName: Locator;
    password: Locator;

    constructor(page: Page) {
        this.page = page
        this.signInBtn = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://www.rahulshettyacademy.com/client/");
    }

    async validLogin(userName: string, password: string){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle'); // not needed to wait for networkidle, but it's a good practice to wait for the page to load
    }
}