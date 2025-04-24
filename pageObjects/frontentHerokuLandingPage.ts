import {Locator, Page} from '@playwright/test';

export class FrontentHerokuLandingPage{
    page:           Page;
    logoutButton:   Locator;
    loginMessageOk: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginMessageOk = page.locator('h4.subheader');
        this.logoutButton   = page.locator('a[href="/logout"]');
    }
    
    async getLoginMessage(): Promise<string> {
        try {
          const text = await this.loginMessageOk.textContent();
          if (!text) {
            throw new Error("Login message element found, but textContent is null or empty.");
          }
          return text;
        } catch (error) {
          console.error(`Error while retrieving login success message:  ${error.message}`);
          throw error;
        }
    }

    async clickLogout(): Promise<void> {
        try {
          await this.logoutButton.click();
        } catch (error) {
          console.error("Error while trying to click the logout button:", error);
          throw error;
        }
      }
    
}