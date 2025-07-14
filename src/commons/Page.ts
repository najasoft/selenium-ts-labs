import { Browser, Builder, WebDriver } from "selenium-webdriver";
import config from "../config.json";


export class Page {
    private driver: WebDriver;
    private baseUrl: string = config.baseUrl;

    constructor(driver?: WebDriver) {
        if (driver) {
            this.driver = driver;

        } else {
            this.driver = new Builder().forBrowser(Browser.CHROME).build();
        }

    }
    public async open(url: string = ""): Promise<void> {
        await this.driver.get(this.baseUrl + url);
    }


    public async getDriver(): Promise<WebDriver> {

        return this.driver;
    }

    public async close(): Promise<void> {
        if (this.driver) {
            await this.driver.quit();
        }
    }

}
