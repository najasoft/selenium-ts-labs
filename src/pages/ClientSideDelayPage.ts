import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { Page } from "../commons/Page";

export class ClientSideDelayPage extends Page {
    /*
    Client Side Delay
An element may appaear on a page after heavy JavaScript processing on a client side. A test should be able to wait for an element to show up.

Scenario
Record the following steps. Press the button below and wait for data to appear (15 seconds), click on text of the loaded label.
Then execute your test to make sure it waits for label text to appear.
*/

    private blueButtonBy: By = By.id("ajaxButton")
    private greenLabelBy: By = By.className("bg-success");

    async clickBlueButton(): Promise<string> {
        const driver: WebDriver = (await this.getDriver());
        await driver.findElement(this.blueButtonBy).click();
        const greenLabel: WebElement = await driver.wait(until.elementLocated(this.greenLabelBy), 30000);
        await driver.wait(until.elementIsVisible(greenLabel));
        return await greenLabel.getText();
    }



}