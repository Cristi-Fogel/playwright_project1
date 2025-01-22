import {test, expect, Locator, Page} from '@playwright/test';


export class FrontendHerokuLoginPage{
    page:           Page;
    usernameInput:  Locator;
    passwordInput:  Locator;
    loginButton:    Locator;
    errorMessage:   Locator;
    logoutMessage:  Locator;
    loginMessageOk: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput  = page.locator('#username');
        this.passwordInput  = page.locator('#password');
        this.loginButton    = page.locator('button.radius:has-text("Login")');
        this.errorMessage   = page.locator('flash-messages');
        this.logoutMessage  = page.locator('div.flash.success');
        this.loginMessageOk = page.locator('h4.subheader');
    }

    async navigate(url:string) {
        await this.page.goto(url);
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
    
    async getLogoutSuccessMessage(): Promise<string>{
        return  (await this.logoutMessage.textContent()) ?? '';
    }
}