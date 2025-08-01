import { time } from "console";
import * as assert from "assert"
import { Actions, Browser, Builder, By, Key, Options, until, WebDriver, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
// Demo site
const demo_site1_url = 'https://www.globalsqa.com/demo-site/';


async function test1(): Promise<void> {

    const options = new chrome.Options();
    options.addArguments("--headless=new");
    const driver: WebDriver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();

    try {
        await driver.get("https://www.amazon.com/");

        // Wait and scroll into footer
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        const links: WebElement[] = await driver.findElements(By.css(".navFooterMoreOnAmazon a"));

        for (const link of links) {
            // Open each link in new tab with Ctrl+Click
            await driver.actions().keyDown(Key.CONTROL).click(link).keyUp(Key.CONTROL).perform();
        }

        console.log(`Opened ${links.length} links in new tabs.`);
    } finally {
        // Do not quit the driver if you want to observe the opened tabs
        // await driver.quit();
    }



}

async function openFooterLinks(): Promise<void> {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    options.addArguments('--disable-features=ChromeWhatsNewUI,ChromeTipsUI,ChromeMemorySaver');

    const driver: WebDriver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        await driver.get("https://www.amazon.com/");

        try {
            // (Dismiss)
            const dismissBtn = await driver.findElement(By.css("input[data-action-type='DISMISS']"));
            await dismissBtn.click();
            console.log("Amazon popup dismissed.");
        } catch (e) {
            console.log("Amazon popup not found.");
        }


        // Handle interruption page if present*
        //glow-toaster-footer
        try {
            const continueBtn = await driver.findElement(By.css(".a-button-text"));
            await continueBtn.click();
            console.log("Bypassed continue page.");
        } catch (e) {
            console.log("No bypass needed.");
        }
        // Scroll to bottom to ensure footer is loaded
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        // close the pop-up if it appears

        // Wait for at least one link in the footer
        const footerLinkSelector = By.css(".navFooterMoreOnAmazon a");
        await driver.wait(until.elementsLocated(footerLinkSelector), 10000);

        // Get all footer links
        const links: WebElement[] = await driver.findElements(footerLinkSelector);
        console.log(`Found ${links.length} links.`);




        // Open each link in a new tab
        for (const link of links) {
            await driver.actions()
                .keyDown(Key.CONTROL)
                .click(link)
                .keyUp(Key.CONTROL)
                .perform();
        }
        // Get original window handle
        const originalWindow: string = await driver.getWindowHandle();
        // Delay 
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        // tabs handles
        const handles: string[] = await driver.getAllWindowHandles();
        for (const handle of handles) {
            if (handle != originalWindow) {
                await driver.switchTo().window(handle);
                await driver.wait(until.elementLocated(By.css("body")), 10000);
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
                sleep(2000);

                await driver.close();
                console
            }

        }

        await driver.switchTo().window(originalWindow);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        console.log("Test completed.");
        // await driver.quit();
    }
}

async function addCookies(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser("chrome").build();
    try {
        driver.get("https://www.tutorialspoint.com/index.htm");

        await driver.manage().addCookie({ name: 'c1', value: 'v1' });
        await driver.navigate().refresh();

        const cookie = await driver.manage().getCookie("c1");
        console.log(`Cookie c1: ${JSON.stringify(cookie)}`);
    } catch (err) {
        console.error("Error adding cookies:", err);
    } finally {
        console.log("Cookies added.");
        await driver.quit();
    }

}

//Actions
async function actions(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    try {

        driver.get("https://www.tutorialspoint.com/index.htm");
        const elt: WebElement = await driver.findElement(By.css(".txt"));
        const actis: Actions = driver.actions();
        await driver.actions()
            .move({ origin: elt })
            .click()
            .perform();


    }
    catch (err) {

        console.error("Error in actions:", err);
    } finally {
        console.log("Actions completed.");
        await driver.quit();
    }

}

// Actions - Drag and Drop
async function dragAndDrop(): Promise<void> {
    const url: string = demo_site1_url + "draganddrop";
    const options = new chrome.Options();
    options.addArguments("--start-maximized");
    const driver: WebDriver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    try {
        await driver.get(url);
        const demoFrame: WebElement = await driver.findElement(By.css('.demo-frame'));
        await driver.switchTo().frame(demoFrame);
        const source: WebElement = await driver.findElement(By.xpath("//li[h5[text()='High Tatras 2']]"));
        const target: WebElement = await driver.findElement(By.css('#trash'));
        await driver.actions()
            .dragAndDrop(source, target)
            .perform();
        await driver.wait(async () => {
            const trashItems = await driver.findElements(By.css("#trash li"));
            return trashItems.length > 0;
        }, 3000); // attend max 3 secondes
        const trash = await driver.findElement(By.id('trash'));
        const trashContent: WebElement[] = await trash.findElements(By.css('li'));
        const texts = await Promise.all(trashContent.map(async (el) => {
            return (await el.getText()).trim();
        }));


        console.log(await texts);
    } catch (err) {
        console.error("Error in drag and drop:", err);
    } finally {
        console.log("Drag and drop completed.");
        await driver.quit();
    }


}



async function testqa1(): Promise<void> {
    let errors: string[] = [];
    const url: string = "https://shop.demoqa.com";
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(url);
    const title: string = await driver.getTitle();
    console.log(`Page title:${title}`);
    const page_url: string = await driver.getCurrentUrl();
    console.log(`Actual url:${page_url}`);
    //Soft assert
    try {
        assert.equal(page_url, url, `Expected ${url}, but got ${page_url}`);

    }
    catch (err) {
        console.log(err);
    }
    const source: string = await driver.getPageSource();
    console.log(`Source length: ${source.length}`);
    driver.quit();



}

testqa1();