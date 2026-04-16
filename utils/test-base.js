import { test as base } from '@playwright/test';

export const test = base.extend({
    testDataForOrder: {
        userName: "johnDoe@example.com",
        password: "Password123",
        productName: "ZARA COAT 3"
    }
})