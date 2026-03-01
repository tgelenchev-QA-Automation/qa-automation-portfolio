const { test, expect, chromium } = require('@playwright/test');

const baseURL = 'http://localhost:3000';

const TEST_USER = {
    email: 'peter@abv.bg',
    password: '123456',
};

let browser;
let context;
let page;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

test.afterAll(async () => {
    await browser.close();
});

test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
});

test.afterEach(async () => {
    await page.close();
    await context.close();
});



function generateEmail() {
    return `user${Date.now()}@example.com`;
}

async function loginAs(page, { email, password } = TEST_USER) {
    await page.goto(baseURL);
    await page.click('text=Login');
    await page.waitForSelector('form');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button:has-text("login")');
    await expect(page.locator('#logoutBtn')).toBeVisible();
}


test('Registration with Valid Data', async () => {
    const email = generateEmail();
    const password = '123456';

    await page.goto(baseURL);
    await page.click('text=Register');
    await page.waitForSelector('form');

    await page.fill('#register-email', email);
    await page.fill('#register-password', password);
    await page.fill('#repeat-password', password);

    await page.click('button:has-text("register")');
    await expect(page.locator('#logoutBtn')).toBeVisible();
});

test('Login with Valid Data', async () => {
    await loginAs(page);
});

test('Logout from the Application', async () => {
    await loginAs(page);

    await page.click('#logoutBtn');
    await expect(page.locator('nav >> text=Login')).toBeVisible();
});

test('Navigation for Guest User Testing', async () => {
    await page.goto(baseURL);

    await expect(page.locator('nav >> text=Login')).toBeVisible();
    await expect(page.locator('nav >> text=Register')).toBeVisible();

    await expect(page.locator('nav .user')).toHaveCSS('display', 'none');
    await expect(page.locator('nav .guest')).not.toHaveCSS('display', 'none');
});

test('Navigation for Logged-In User Testing', async () => {
    await loginAs(page);

    await expect(page.locator('nav >> text=Events')).toBeVisible();
    await expect(page.locator('nav >> text=Add Event')).toBeVisible();
    await expect(page.locator('nav >> text=Logout')).toBeVisible();

    await expect(page.locator('nav .guest')).toHaveCSS('display', 'none');
    await expect(page.locator('nav .user')).not.toHaveCSS('display', 'none');
});



test('Add an Event Testing', async () => {
    await loginAs(page);

    await page.click('text=Add Event');
    await page.waitForSelector('form');

    const title = `Test Event ${Date.now()}`;
    await page.fill('#name', title);
    await page.fill('#event-image', 'https://example.com/image.jpg');
    await page.fill('#event-category', 'Test Category');
    await page.fill('#event-description', 'This is a test event.');
    await page.fill('#date', '31.12.2025 from 20:00');

    await page.click('button:has-text("Add")');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator(`text=${title}`)).toBeVisible();
});

test('Edit an Event Testing', async () => {
    await loginAs(page);

    await page.click('text=Events');
    await page.waitForSelector('.event');

    await page.locator('.event >> nth=0 >> text=Details').click();

    await page.click('#edit-btn');
    await page.waitForSelector('form');

    const newTitle = `Updated Title ${Date.now()}`;
    await page.fill('#name', newTitle);
    await page.click('button:has-text("Edit")');

    await expect(page.locator('#details-title')).toContainText(newTitle);
});

test('Delete an Event Testing', async () => {
    await loginAs(page);

    await page.click('text=Events');
    await page.waitForSelector('.event');

    await page.locator('.event >> nth=0 >> text=Details').click();

    page.once('dialog', dialog => dialog.accept());
    await page.click('#delete-btn');

    await expect(page).toHaveURL(/.*dashboard/);
});