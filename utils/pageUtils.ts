import { Page } from '@playwright/test';

// used primarily for frontend tests
export async function navigateTo(page: Page, url: string) {
    await page.goto(url);
}
