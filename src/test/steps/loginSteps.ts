import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";
import Assert from "../../helper/wrapper/assert";

let loginPage: LoginPage;
let assert: Assert;

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    loginPage = new LoginPage(fixture.page);
    assert = new Assert(fixture.page);
    await loginPage.navigateToLoginPage();
});

Given('User enter the username as {string}', async function (username) {
    await loginPage.enterUserName(username);
});

Given('User enter the password as {string}', async function (password) {
    await loginPage.enterPassword(password);
})

When('User click on the login button', async function () {
    await loginPage.clickLoginButton();
    await fixture.page.waitForLoadState();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
});


Then('Login should be success', async function () {
    fixture.logger.info("Waiting for 10 seconds")
    await loginPage.verifyGlobalDPLog();
   
});
