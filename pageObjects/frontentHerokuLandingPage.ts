import {test, expect, Locator, Page} from '@playwright/test';


export class FrontentHerokuLandingPage{
    page:           Page;
    logoutButton:   Locator;
    loginMessageOk: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginMessageOk = page.locator('h4.subheader');
        this.logoutButton   = page.locator('a[href="/logout"]');
    }

    async navigate(url:string) {
        await this.page.goto(url);
    }
    
    async getLoginMessage(): Promise<string> {
        return (await this.loginMessageOk.textContent()) ?? '';
    }
}