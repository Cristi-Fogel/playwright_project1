import { Page, Locator } from '@playwright/test';

// used primarily for frontend tests
export async function navigateTo(page: Page, url: string) {
    await page.goto(url);
}

export async function waitForElement(page: Page, locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
}


// deviations from 0project
export async function waitForElementToDisappear(page: Page, locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'hidden', timeout });
}

export async function waitTilEnabled(page: Page, locator: Locator, timeout = 5000) {
    await page.waitForFunction(
        (element) => element !== null && element.hasAttribute('enabled'),
        await locator.elementHandle(),{ timeout }
    );
}

export async function waitTilDisabled(page: Page, locator: Locator, timeout = 5000) {
    await page.waitForFunction(
        (element) => element !== null && element.hasAttribute('disabled'),
        await locator.elementHandle(),{ timeout }
    );
}

