const {Builder} = require('selenium-webdriver');

const DashboardPage = require ('./WebComponent/DashboardPage');
const RegisterPage = require ('./WebComponent/RegisterPage');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const username = process.env.USERNAME;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 5 [Register With Existing User]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }  
    });
    it('Verify Register Page and try to Register', async function () {
        const loginPage = new RegisterPage(driver);
        await loginPage.loginButton();
        const loginTitle = await loginPage.verifySignupHeader();
        assert.strictEqual(loginTitle, 'New User Signup!', 'We are not in login page');
        await loginPage.login(username ,email);
        const errorAlert = await loginPage.verifyError();
        assert.strictEqual(errorAlert, 'Email Address already exist!', 'Email is not exist');

    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});