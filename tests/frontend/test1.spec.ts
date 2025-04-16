import { test, expect } from '@playwright/test';
import { getURL } from "../../utils/urlBuilder";
import { navigateTo } from '../../utils/pageUtils';
import { FrontendHerokuLoginPage } from '../../pageObjects/frontentHerokuLoginPage';
import { FrontentHerokuLandingPage } from '../../pageObjects/frontentHerokuLandingPage';
import { validationStrings } from '../../validationStrings';
import { credentials } from '../../baseCredentials';

test('frontend - has title', async ({ page }) => {
  await navigateTo(page, getURL("herokuURL", "loginPageHeroku"));
  await expect(page).toHaveTitle("The Internet");
});

test('frontend Heroku - Login test', async ({ page }) => {
  const loginPage = new FrontendHerokuLoginPage(page);
  const landingPage = new FrontentHerokuLandingPage(page);

  await navigateTo(page, getURL("herokuURL", "loginPageHeroku"));
  await loginPage.login(credentials.users.admin.username, credentials.users.admin.password);
  const loginMessage = await landingPage.getLoginMessage();
  await expect(loginMessage).toBe(validationStrings.login.successMessage);
});

test('frontend Heroku - Logout test', async ({ page }) => {
  const loginPage = new FrontendHerokuLoginPage(page);
  const landingPage = new FrontentHerokuLandingPage(page);

  await navigateTo(page, getURL("herokuURL", "loginPageHeroku"));
  await loginPage.login(credentials.users.admin.username, credentials.users.admin.password);
  await landingPage.logoutButton.click();
  const logoutMessage = await loginPage.getLogoutSuccessMessage();
  await expect(logoutMessage).toContain(validationStrings.logout.successMesage);
});


