import { test, expect, request } from '@playwright/test';

async function getToken(apiContext, {email, password}){
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {data: {email: email, password: password}});
    const loginResponseJson = await loginResponse.json();
    expect(loginResponse.ok()).toBe(true);
    const token = loginResponseJson.token;
    return token;
}

async function loginAs(page, {email, password}){
    await page.goto("https://eventhub.rahulshettyacademy.com/");    
    const userEmail = page.locator("#email");
    const userPassword = page.locator("#password");
    await userEmail.fill(email);
    await userPassword.fill(password);  
    await Promise.all([
        page.waitForResponse('**/api/auth/**'),
        page.getByRole('button', {name: 'Sign In'}).click(),
    ]);    
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
}

test('Cross-User Booking Access Denied', async({page}) => {
    const apiContext = await request.newContext();
    const token = await getToken(apiContext, {email: "johnDoe@yahoo.com", password: "Password123!"});
    const eventResponse = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events", {headers: {Authorization: `Bearer ${token}`}});
    const eventResponseJson = await eventResponse.json();
    expect(eventResponse.ok()).toBe(true);
    const eventId = eventResponseJson.data[0].id;

    const bookingResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {headers: {Authorization: `Bearer ${token}`}, data: {eventId: eventId, customerName: "Yahoo User", customerEmail: "JohnDoe@yahoo.com", customerPhone: "1234567890", quantity: 1}});
    const bookingResponseJson = await bookingResponse.json();
    expect(bookingResponse.ok()).toBe(true);
    const yahooBookingId = bookingResponseJson.data.id;
    console.log(yahooBookingId);
    await loginAs(page, {email: "johnDoe@example.com", password: "Password123!"});
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`, {waitUntil: 'networkidle'});
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
});