import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.productItem = page.locator("div li").first()
        this.checkoutBtn = page.locator("text=Checkout")
    }

    async verifyProductInCart(productName){
        await this.productItem.waitFor();
        const bool = await this.productItem.locator("h3:has-text('"+productName+"')").isVisible(); 
        expect(bool).toBe(true);
    }

    async navigateToCheckout(){
        await this.checkoutBtn.click();
    }
}