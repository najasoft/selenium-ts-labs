import { By, WebDriver } from "selenium-webdriver";

export class HomePage {

    constructor(private driver: WebDriver) { }

    private loginBtnLocator: By = By.id('login');

    public async loginClick(): Promise<void> {
        await (await this.driver.findElement(this.loginBtnLocator)).click();

    }

}

