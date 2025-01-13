import { test, expect } from '@playwright/test';
import { getURL } from "../../utils/urlBuilder";
import { FrontendHerokuLoginPage } from '../../pageObjects/frontentHerokuLoginPage';

test('frontend - has title', async ({ page }) => {
  await page.goto(getURL("herokuURL", "loginPageHeroku"));

  await expect(page).toHaveTitle("The Internet");
});

test('frontend Heroku - Login test', async ({page})=>{
  const loginPage = new FrontendHerokuLoginPage(page);
  await loginPage.navigate(getURL("herokuURL", "loginPageHeroku"));
  
  await expect(page).toHaveTitle("The Internet");
});