import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    userName: string;
    password: string;
    productName: string;
}
export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: {
        userName: "johnDoe@example.com",
        password: "Password123",
        productName: "ZARA COAT 3"
    }
})