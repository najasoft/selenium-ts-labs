import { Browser, Builder, By, ITimeouts, WebDriver, WebElement } from "selenium-webdriver";

const menuUrl: string = 'https://demoqa.com/select-menu';
const textBoxUrl: string = "https://demoqa.com/text-box";


async function menuTest(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(menuUrl);
    //Old style menu
    const menuElement: WebElement = await driver.findElement(By.css("select#oldSelectMenu>option:nth-of-type(2)"));
    console.log(await menuElement.getText());
    //locate a web element using text strings
    driver.get(textBoxUrl);
    // Starts with
    const userNameElement: WebElement = await driver.findElement(By.css("input[id^='userN']"));
    console.log(await userNameElement.getAttribute('placeholder'));
    //Ends with
    const emailElement: WebElement = await driver.findElement(By.css("input[id$='ail'"));
    console.log(await emailElement.getAttribute('placeholder'));
    //Contains
    const currentAddress: WebElement = await driver.findElement(By.css("textarea[id*='urr'"));
    console.log(await currentAddress.getAttribute('placeholder'));

    driver.close();

}

async function runTest(): Promise<void> {
    await menuTest();
}



runTest().catch(err => console.log(`Erreur:${err}`));