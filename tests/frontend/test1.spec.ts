
import { test, expect } from '@playwright/test';
import { getURL } from "../../utils/urlBuilder";
import { FrontendHerokuLoginPage } from '../../pageObjects/frontentHerokuLoginPage';
import { FrontentHerokuLandingPage } from '../../pageObjects/frontentHerokuLandingPage';
import { validationStrings } from '../../validationStrings';
import { credentials } from '../../baseCredentials';

test('frontend - has title', async ({ page }) => {
  await page.goto(getURL("herokuURL", "loginPageHeroku"));

  await expect(page).toHaveTitle("The Internet");
});

test('frontend Heroku - Login test', async ({page})=>{
  const loginPage = new FrontendHerokuLoginPage(page);
  const landingPage = new FrontentHerokuLandingPage(page);

  await loginPage.navigate(getURL("herokuURL", "loginPageHeroku"));
  await expect(page).toHaveTitle("The Internet");
  await loginPage.login(credentials.users.admin.username, credentials.users.admin.password);
  const loginMessage = await landingPage.getLoginMessage(); // Fetch login message and store it in variable to have access to it
  // console.log("Login Message:", loginMessage);

  await expect(loginMessage).toBe(validationStrings.login.successMessage);
});

