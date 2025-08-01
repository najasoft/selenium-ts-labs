import { Browser, Builder, By, WebDriver, WebElement } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import { adBlock } from "../utils/adBlock";
const url: string = 'https://cosmocode.io/automation-practice-webtable/';

async function runTest(): Promise<void> {
    const options: chrome.Options = new chrome.Options();
    // adBlock(options);
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).
        setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get(url);
    // the value of the cell 3,2
    const cell: WebElement = await driver.findElement(By.xpath("//tbody/tr[3]/td[2]"));
    console.log(await cell.getText());
    // Checking the corresponding row - find the preceding td in the same row
    const precedingCell: WebElement = await cell.findElement(By.xpath("preceding-sibling::td/input"));

    console.log(await precedingCell.getTagName());

    await precedingCell.click();


}


runTest().catch(err => console.log("Error:" + err));