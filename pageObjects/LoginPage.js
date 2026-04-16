export class LoginPage {
    constructor(page) {
        this.page = page
        this.signInBtn = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://www.rahulshettyacademy.com/client/");
    }

    async validLogin(userName, password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle'); // not needed to wait for networkidle, but it's a good practice to wait for the page to load
    }
}