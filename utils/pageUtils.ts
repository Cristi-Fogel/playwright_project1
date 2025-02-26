import { Page, Locator } from '@playwright/test';

// used primarily for frontend tests
export async function navigateTo(page: Page, url: string) {
    await page.goto(url);
}

export async function waitForElement(page: Page, locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
}
