/*
- Launch new Browser
- Open https://www.toolsqa.com/selenium-training/ website
Click on Registration link using By.partialLinkText("REGISTRATION"); locator *
Come back to Home page (Use 'Back' command)
Again go back to Registration page (This time use 'Forward' command)
Again come back to Home page (This time use 'To' command)
Refresh the Browser (Use 'Refresh' command)
Close the Browser
*/

import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";

const url: string = "https://www.toolsqa.com/selenium-training/";

async function runTest(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    driver.get(url);
    const joinLocator: By = By.partialLinkText("REGISTRATION");
    await driver.wait(until.elementLocated(joinLocator));
    const joinElement: WebElement = await driver.findElement(joinLocator);
    await joinElement.click();
    await driver.navigate().back();
    await driver.navigate().forward();
    await driver.navigate().to(url);
    await driver.navigate().refresh();
    // await driver.close();


}

runTest();