import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        ph_username: "//input[@formcontrolname='email']",
        ph_password: "//input[@formcontrolname='password']",
        btn_login: "//button[@class='login-button dp-primary-btn']",
        logo_dp:"//div[@class='d-flex align-items-center']//div[1]"
    }

    async navigateToLoginPage() {
        await this.page.goto(process.env.BASEURL);
    }

    async enterUserName(userName: string) {
        await this.page.locator(this.Elements.ph_username).fill(userName);
        // if(this.page.locator(this.Elements.err_text).isVisible){
        //     throw new Error('Please provide a valid username');
        // }  
    }

    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.ph_password).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.btn_login);
    }

    async verifyGlobalDPLog() {
        const global_dp = await this.page.locator(this.Elements.logo_dp);
        await global_dp.isVisible();
    }
}