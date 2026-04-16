import { test, expect } from "@playwright/test";

test("Security test request intercept", async ({ page }) => {
  //login and reach orders page
  await page.goto("https://www.rahulshettyacademy.com/client/");
  const email = "johnDoe@example.com";
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Password123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle"); // not needed to wait for networkidle, but it's a good practice to wait for the page to load
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();

  //intercept order details API
  await page.route(
    "https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6960eae1c941646b7a8b3ed",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
