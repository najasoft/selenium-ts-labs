import assert from "node:assert";
import { constrainedMemory } from "node:process";
import { Browser, Builder, By, Options, until, WebDriver, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";


async function windows_test1(): Promise<void> {
    const newWindowButtonBy: By = By.id('windowButton');
    const tabButtonBy: By = By.id('tabButton');
    const messageWindowButtonBy: By = By.id('messageWindowButton');
    const sampleHandlingBy: By = By.id("sampleHeading");
    const sampleHandlingMessage: string = "This is a sample page";

    const url: string = 'https://demoqa.com/browser-windows';

    // Chrome options
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const prefs = {
        'profile.managed_default_content_settings.images': 2  // 2 = block
    };
    options.setUserPreferences(prefs);

    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    try {
        await driver.get(url);
        const newWindowButton: WebElement = await driver.findElement(newWindowButtonBy);
        await newWindowButton.click();
        let handles: string[] = await driver.getAllWindowHandles();
        const mainWindowHandle: string = await driver.getWindowHandle();
        let newSampleWindowHandle: string | null = null;
        /*handles.forEach((handle: string) => {
            if (handle !== mainWindowHandle) {
                newSampleWindowHandle = handle;
            }
        });*/
        if (handles.length > 1) {
            newSampleWindowHandle = handles.filter((handle) => handle !== mainWindowHandle)[0];
        }
        if (newSampleWindowHandle !== null) {
            await driver.switchTo().window(newSampleWindowHandle);
            const actual: string = await driver.findElement(sampleHandlingBy).getText();
            console.log(`Window title:${await driver.getTitle()}`);
            console.log(actual);
            assert.strictEqual(actual, sampleHandlingMessage, `${sampleHandlingMessage} expected, but got ${actual}`);
            await driver.close();
            await driver.switchTo().window(mainWindowHandle);
            console.log(`Main Windows title:${await driver.getTitle()}`);

        }

        // tab window
        console.log("opening a new tab");
        await driver.findElement(tabButtonBy).click();
        handles = await driver.getAllWindowHandles();


        if (handles.length > 1) {
            const tabWindowHandle: string = await handles.filter((h) => h !== mainWindowHandle)[0];
            await driver.switchTo().window(tabWindowHandle);
            console.log(`Tab title:${await driver.getTitle()}`);
            await driver.close();
            await driver.switchTo().window(mainWindowHandle);

        }

        // Window Message
        console.log('Opening a window message');
        await driver.findElement(messageWindowButtonBy).click();
        handles = await driver.getAllWindowHandles();
        if (handles.length > 1) {
            const messageWindowHandle = handles.find((h) => h !== mainWindowHandle);
            console.log(await driver.getCurrentUrl());
            if (messageWindowHandle) {
                await driver.switchTo().window(messageWindowHandle);

            }
            //console.log(await driver.getCurrentUrl());

            // console.log(`Message title: ${await driver.getTitle()}`);
            console.log("m0");
            await driver.takeScreenshot();
            console.log("m1");
            //const elt = await driver.findElement(By.css('body'));
            console.log("m2");

            //  console.log(`Message body: ${elt.getText()}`);

            console.log('m3');
            await driver.close();
            console.log('m4');
            await driver.switchTo().window(mainWindowHandle);
            console.log('m5');
        }
    }
    catch (err) {
        console.log(`Error:${err}`)
    }

    finally {
        await driver.quit();
    }



}

windows_test1();