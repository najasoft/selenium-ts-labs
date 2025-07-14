import { By, until, WebElement } from "selenium-webdriver";
import { Page } from "../commons/Page";

export class LoadDelayPage extends Page {


    private delayButtonBy: By = By.className("btn-primary");
    // Not used
    private spinnerBy: By = By.id('spinner');
    private loadDelaySectionBy: By = By.linkText('Load Delay');


    async loadPage(): Promise<string> {
        const driver = await this.getDriver();
        console.log("#Hello 1");
        await this.open();
        await driver.findElement(this.loadDelaySectionBy).click();
        await driver.wait(until.elementLocated(this.delayButtonBy));
        const delayButton: WebElement = await driver.findElement(this.delayButtonBy);
        const delayButtonText: string = await delayButton.getText();
        console.log(delayButtonText);
        return delayButtonText;
    }


}