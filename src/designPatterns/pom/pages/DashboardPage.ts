import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export class DashboardPage {
    constructor(private driver: WebDriver) { }

    private userNameLocator: By = By.id('userName-value');
    private logoutLocator: By = By.id('submit');
    private searchBoxFieldLocator: By = By.id('searchBox');
    private searchBoxBtnLocator: By = By.id('basic-addon2');
    private booksTitles: By = By.xpath('//a[contains(@href,"/books?book")]');

    public async getUserName(): Promise<string> {
        const userName: WebElement = await this.driver.wait(
            until.elementLocated(this.userNameLocator),
            5000
        );
        await this.driver.wait(until.elementIsVisible(userName));
        return await userName.getText();
    }

    public async search(term: string): Promise<string[]> {
        const searchField: WebElement = await this.driver.findElement(this.searchBoxFieldLocator);
        const searchBtn: WebElement = await this.driver.findElement(this.searchBoxBtnLocator);

        try {
            await searchField.sendKeys(term);
            await searchBtn.click();
            await this.driver.wait(until.elementsLocated(this.booksTitles), 5000);
            const elements = await this.driver.findElements(this.booksTitles);

            await this.driver.wait(until.elementIsVisible(elements[0]));

            const results: string[] = [];
            for (const element of elements) {
                const title = await element.getText();
                results.push(title);
            }

            return results;
        } catch (err) {
            console.error("❌ Error during search:", err);
            return [];
        }
    }

    public async logoutClick(): Promise<void> {
        const logoutBtn = await this.driver.findElement(this.logoutLocator);
        await logoutBtn.click();
    }
}
