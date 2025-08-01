import { Browser, Builder, WebDriver } from "selenium-webdriver";

const shopUrl: string = 'https://shop.demoqa.com';
const booksUrl: string = 'https://demoqa.com/books';


async function readyState(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(booksUrl);
    await driver.wait(async (d) => {
        const readyState = await d.executeScript("return document.readyState;")
        console.log(readyState);
        return readyState === 'complete';
    }, 5000);
    await driver.close();

}
// Jquery
async function jQueryState(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(booksUrl);
    await driver.wait(async (d) => {
        const jQueryState = await d.executeScript("return jQuery.active;")
        console.log(jQueryState);
        return jQueryState == 0;
    }, 5000);
    await driver.close();

}

async function runTests(): Promise<void> {
    await jQueryState();
}

runTests().catch(err => console.log(`Error: ${err}`));