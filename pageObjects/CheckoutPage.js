import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.countryInput = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.submitBtn = page.locator(".action__submit");
        this.userLabel = page.locator(".user__name label");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async enterCountry(countryCode,countryName){
        await this.countryInput.pressSequentially(countryCode, {delay: 150});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if(text === countryName){
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async SubmitAndGetOrderId(){
        await this.submitBtn.click();
        expect(await this.orderConfirmationText.textContent()).toContain(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}