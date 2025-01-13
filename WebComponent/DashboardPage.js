const {By} = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.logoDisplay = By.xpath("//img[@alt='Website for automation practice']");
    }
    async navigate(baseURL){
        await this.driver.get(baseURL);
    }

    async verifyLogoHome() {
        const logo = await this.driver.findElement(this.logoDisplay);
        return logo;
    }
}

module.exports = DashboardPage;