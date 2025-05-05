import { Page, Locator } from '@playwright/test';
import { getURL } from './urlBuilder';

// used for frontend tests
export async function navigateTo(page: Page, url: string) {
    try {
        await page.goto(url);
    } catch (error) {
        throw new Error(`Failed to navigate to ${url}: ${error.message}`);
    }
}

//implicit timeout is 30 seconds, but we can override it setting the timeout parameter with a different value
export async function waitForElement(page: Page, locator: Locator, timeout = 5000) {
    try{
        await locator.waitFor({ state: 'visible', timeout });
    }
    catch (error) {
        throw new Error(`Error waiting for element: ${locator}. Error: ${error.message}`);
    }
}

// deviations from 0project
export async function waitForElementToDisappear(page: Page, locator: Locator, timeout = 5000) {
    try {
        await locator.waitFor({ state: 'hidden', timeout });
    } catch (error) {
        throw new Error(`Error waiting for element to disappear: ${locator}. Error: ${error.message}`);
    }
}


export async function waitTilEnabled(page: Page, locator: Locator, timeout = 5000) {
    const elementHandle = await locator.elementHandle();
    if (!elementHandle) {
        throw new Error('Element handle is null. Cannot wait for enabled state.');
    }
    await page.waitForFunction(
        (element) => element !== null && element.hasAttribute('enabled'),
        elementHandle, { timeout }
    );
}

export async function waitTilDisabled(page: Page, locator: Locator, timeout = 5000) {
    const elementHandle = await locator.elementHandle();
    if (!elementHandle) {
        throw new Error('Element handle is null. Cannot wait for disabled state.');
    }
    await page.waitForFunction(
        (element) => element !== null && element.hasAttribute('disabled'),
        elementHandle, { timeout }
    );
}

// Click an element after waiting for it to be visible and enabled
export async function clickElement(page: Page, locator: Locator, timeout = 5000) {
    await waitForElement(page, locator, timeout);
    await waitTilEnabled(page, locator, timeout);
    await locator.click();
}

// Type text into an input field after waiting for it to be visible and enabled
export async function typeText(page: Page, locator: Locator, text: string, timeout = 5000) {
    await waitForElement(page, locator, timeout);
    await waitTilEnabled(page, locator, timeout);
    await locator.fill(text);
}

// Get the text content of an element
export async function getTextContent(page: Page, locator: Locator, timeout = 5000): Promise<string> {
    await waitForElement(page, locator, timeout);
    const textContent = await locator.textContent();
    if (textContent === null) {
        throw new Error('Text content is null');
    }
    return textContent;
}

// Wait for navigation to complete
export async function waitForNavigation(page: Page, timeout = 5000) {
    await page.waitForURL('**', { timeout });
}

// Take a screenshot of the page or a specific element
    // If locator is not provided, the entire page will be captured 
    // path default location is the project's root directory
export async function takeScreenshot(page: Page, path: string, locator?: Locator) {
    if (locator) {
        await locator.screenshot({ path });
    } else {
        await page.screenshot({ path });
    }
}

//using main login page for resetting, as it shouldn't have any data stored at this point
export async function resetBrowserState(page: Page) {
    await page.context().clearCookies();
    await page.goto(getURL("herokuURL", "loginPageHeroku"));
    await page.evaluate(() => localStorage.clear());
    await page.evaluate(() => sessionStorage.clear());
  }
