import {Locator, Page} from '@playwright/test';

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
    
    async login(username: string, password: string) {
        try {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async getErrorMessage(): Promise<string> {
        const text = await this.errorMessage.textContent();
        if (!text) {
            throw new Error('Error message is null or empty.');
        }
        return text;
    }
    
    async getLogoutSuccessMessage(): Promise<string>{
        return  (await this.logoutMessage.textContent()) ?? '';
    }
}