import { Browser, Builder, By, Options, until, WebDriver, WebElement } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import { SoftAssert } from "../utils/SoftAssert";

const url: string = 'https://demoqa.com/automation-practice-form';
const assert: SoftAssert = new SoftAssert();
/*
<div class="custom-control custom-checkbox custom-control-inline">
<input type="checkbox" id="hobbies-checkbox-2" class="custom-control-input" value="2">
<label title="" for="hobbies-checkbox-2" class="custom-control-label">Reading</label></div>
*/



async function checkbox_test1(): Promise<void> {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

    /*
     Generally, checkboxes can be checked/unchecked by clicking both the checkbox 
     itself or the labels associated with the checkboxes.
    */
    const hobbie2By: By = By.xpath("//label[text()='Reading']");
    await driver.get(url);
    const hobbie2: WebElement = await driver.findElement(hobbie2By);
    // the google ad iframe is covering the checkbox label
    await driver.executeScript("arguments[0].scrollIntoView({block:'center'})", hobbie2);
    await driver.wait(until.elementIsVisible(hobbie2), 5000);
    await driver.wait(until.elementIsEnabled, 5000);
    await hobbie2.click();
    const hobbie1: WebElement = await driver.findElement(By.css("label[for='hobbies-checkbox-1']"));
    await hobbie1.click();

    const hobbie3: WebElement = await driver.findElement(By.xpath("//label[text()='Music']"));
    await driver.wait(until.elementIsVisible(hobbie3), 5000);
    await hobbie3.click();

}
// Remove google ads
async function removeAds(driver: WebDriver): Promise<void> {
    await driver.wait(() =>
        async () => {
            const elts = await driver.findElements(By.xpath('//iframe'));
            return elts.length > 0;
        }
        , 15000);
    await driver.executeScript("let ads = document.querySelectorAll('iframe');" +
        "   ads.forEach(ad => {" +
        "if (ad.src.includes('googlesyndication.com')) {" +
        "  ad.remove();" +
        " } " +
        " });"
    );
}

// Without ads 
async function checkbox_test2(): Promise<void> {

    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    console.log("M1");
    const hobbie2By: By = By.xpath("//label[text()='Reading']");
    console.log("M2");
    await driver.get(url);
    console.log("M3");
    //await driver.wait(until.elementsLocated(By.css('iframe')));
    await removeAds(driver);
    console.log("M4");
    const hobbie2: WebElement = await driver.findElement(hobbie2By);
    console.log("M5");
    await hobbie2.click();
    assert.ok(await hobbie2.isSelected(), `expected value is true but got ${await hobbie2.isSelected()} `);
    const hobbie1: WebElement = await driver.findElement(By.css("label[for='hobbies-checkbox-1']"));
    await hobbie1.click();
    assert.ok(await hobbie1.isSelected(), `expected value is true but got ${await hobbie1.isSelected()} `);
    const hobbie3: WebElement = await driver.findElement(By.xpath("//label[text()='Music']"));

    await hobbie3.click();
    assert.ok((await hobbie3.isSelected()), `expected value is true but got ${await hobbie3.isSelected()} `);

    assert.assertAll();


}


async function runTest(): Promise<void> {
    await checkbox_test2();

}

runTest();
