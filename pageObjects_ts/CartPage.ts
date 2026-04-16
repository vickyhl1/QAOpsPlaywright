import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    page: Page;
    productItem: Locator;
    checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItem = page.locator("div li").first()
        this.checkoutBtn = page.locator("text=Checkout")
    }

    async verifyProductInCart(productName: string){
        await this.productItem.waitFor();
        const bool = await this.productItem.locator("h3:has-text('"+productName+"')").isVisible(); 
        expect(bool).toBe(true);
    }

    async navigateToCheckout(){
        await this.checkoutBtn.click();
    }
}