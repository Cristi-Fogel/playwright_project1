import { test, expect } from '@playwright/test';
import { getURL } from "../../utils/urlBuilder";

test('frontend - has title', async ({ page }) => {
  await page.goto(getURL("herokuURL", "loginPageHeroku"));

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("The Internet");
});