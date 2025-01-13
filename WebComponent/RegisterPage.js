const {By} = require('selenium-webdriver');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.loginMenu = By.css("[href='/login']");
        this.verifySignup = By.xpath("//h2[.='New User Signup!']");
        this.usernameInput = By.css("[name='name']");
        this.emailInput = By.css("[data-qa='signup-email']");
        this.signupButton = By.css("[data-qa='signup-button']");
        this.errorMsg = By.xpath("//p[.='Email Address already exist!']");
    }

    async loginButton() {
        await this.driver.findElement(this.loginMenu).click();
    }

    async login(username, email) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.signupButton).click();
    }
    async verifySignupHeader() {
        const title = await this.driver.findElement(this.verifySignup).getText();
        return title;
    }

    async verifyError() {
        const title = await this.driver.findElement(this.errorMsg).getText();
        return title;
    }
}

module.exports = RegisterPage;