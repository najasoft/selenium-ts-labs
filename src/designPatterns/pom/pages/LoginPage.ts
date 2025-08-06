import { log } from "console";
import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export class LoginPage {
    constructor(private driver: WebDriver) {

    }

    private userNameLocator: By = By.id('userName');
    private passwordLocator: By = By.id('password');
    private loginLocator: By = By.id('login');

    public async enterUserName(username: string): Promise<void> {
        await this.driver.findElement(this.userNameLocator).sendKeys(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.driver.findElement(this.passwordLocator).sendKeys(password);
    }

    public async loginClick(): Promise<void> {
        await this.driver.executeScript('window.scrollBy(0, 300);');
        const loginButton: WebElement = await this.driver.findElement(this.loginLocator);
        await loginButton.click();

    }




}