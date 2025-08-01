import { Browser, Builder, By, ITimeouts, until, WebDriver, WebElement } from "selenium-webdriver";

const dynaUrl: string = 'https://demoqa.com/dynamic-properties';
const windowsUrl: string = 'http://demoqa.com/browser-windows/';




//  //Implicit Timeout
async function implWaits(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    driver.manage().window().maximize();
    //await driver.manage().setTimeouts({ script: 5000, pageLoad: 5000, implicit: 6000 });
    await driver.manage().setTimeouts({ implicit: 50000 });
    await driver.get(dynaUrl);
    const timeOuts: ITimeouts = await driver.manage().getTimeouts();
    console.log(timeOuts);
    const buttonVisibleAfter5Locator: By = By.css('#visibleAfter');
    try {
        const eltButton: WebElement = await driver.findElement(buttonVisibleAfter5Locator);
        await eltButton.click();
        console.log(await eltButton.getText());
    }
    catch (err) {
        console.log("err:" + err);
    }
    driver.close();

}
// Fluent Wait - Explicit wait with custom polling interval
async function fluentWait(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(dynaUrl);

    try {
        // Wait for element to be present first, then check visibility
        const elt = await driver.wait(until.elementLocated(By.css('#visibleAfter')), 10000);

        // Fluent wait implementation with parameters:
        // - Condition: until.elementIsVisible(elt)
        // - Timeout: 5000ms (5 seconds)
        // - Custom message: "Element not visible after 5 seconds"
        // - Polling interval: 50ms (check every 50ms)
        await driver.wait(
            until.elementIsVisible(elt),
            5000,
            "Element not visible after 5 seconds",
            50
        );

        console.log("Element is now visible!");
        await elt.click();
        console.log("Element text:", await elt.getText());

    } catch (error) {
        console.log("Fluent wait failed:", error);
    } finally {
        await driver.close();
    }
}


// Custom FluentWait implementation (Java FluentWait equivalent)
interface FluentWaitOptions<T> {
    timeout: number;
    pollingInterval: number;
    ignoreExceptions?: string[];
    condition: (driver: WebDriver) => Promise<T | null>;
    message?: string;
}

async function customFluentWait<T>(driver: WebDriver, options: FluentWaitOptions<T>): Promise<T> {
    const startTime = Date.now();
    const { timeout, pollingInterval, ignoreExceptions = [], condition, message } = options;

    while (Date.now() - startTime < timeout) {
        try {
            const result = await condition(driver);
            if (result !== null) {
                return result; // Condition met, return result
            }
        } catch (error: any) {
            // Ignore specified exceptions (like Java FluentWait.ignoring())
            const shouldIgnore = ignoreExceptions.some(exceptionType =>
                error.name?.includes(exceptionType) || error.message?.includes(exceptionType)
            );

            if (!shouldIgnore) {
                throw error; // Re-throw if not in ignore list
            }
            // Otherwise, continue polling
        }

        // Wait for polling interval before next attempt
        await new Promise(resolve => setTimeout(resolve, pollingInterval));
    }

    // Timeout reached
    throw new Error(message || `FluentWait timed out after ${timeout}ms`);
}

// SimpleFluentWait class with builder pattern (Java-like)
class SimpleFluentWait {
    private driver: WebDriver;
    private timeoutMs: number = 5000;
    private pollingMs: number = 500;
    private ignoredExceptions: string[] = [];

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    withTimeout(timeoutMs: number): SimpleFluentWait {
        this.timeoutMs = timeoutMs;
        return this;
    }

    pollingEvery(pollingMs: number): SimpleFluentWait {
        this.pollingMs = pollingMs;
        return this;
    }

    ignoring(...exceptions: string[]): SimpleFluentWait {
        this.ignoredExceptions.push(...exceptions);
        return this;
    }

    async until<T>(condition: (driver: WebDriver) => Promise<T | null>): Promise<T> {
        return customFluentWait(this.driver, {
            timeout: this.timeoutMs,
            pollingInterval: this.pollingMs,
            ignoreExceptions: this.ignoredExceptions,
            condition: condition
        });
    }
}

// Example usage of Java-like FluentWait
async function javaLikeFluentWait(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(dynaUrl);

    try {
        // Java-like FluentWait syntax
        const element = await new SimpleFluentWait(driver)
            .withTimeout(10000)
            .pollingEvery(100)
            .ignoring('NoSuchElementError', 'ElementNotVisibleError', 'ElementClickInterceptedError')
            .until(async (driver) => {
                try {
                    const el = await driver.findElement(By.css('#visibleAfter'));
                    if (await el.isDisplayed()) {
                        // Try to click the element, if intercepted, scroll or wait
                        try {
                            await el.click();
                            return el; // Successfully clicked
                        } catch (clickError: any) {
                            if (clickError.name?.includes('ElementClickInterceptedError')) {
                                // Scroll element into view and try again
                                await driver.executeScript("arguments[0].scrollIntoView(true);", el);
                                await new Promise(resolve => setTimeout(resolve, 500)); // Wait a bit
                                await el.click();
                                return el;
                            }
                            throw clickError; // Re-throw if different error
                        }
                    }
                    return null;
                } catch {
                    return null;
                }
            });

        console.log("Element found with Java-like FluentWait!");
        console.log("Element text:", await element.getText());

    } catch (error) {
        console.log("Java-like FluentWait failed:", error);
    } finally {
        await driver.close();
    }
}


/*
Problem: On dynaUrl page there is a button "Change Color" this button turns red a after a few seconds. 
Lets write a simple wait which can wait for the color of the button to change.
 Once the color has changed, click on the button.
*/
async function colorChange(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(dynaUrl);
    const colorButtonBy: By = By.css('#colorChange');
    await driver.wait(until.elementLocated(colorButtonBy), 5000);
    const colorButtonElement = await driver.findElement(colorButtonBy);
    const color: string = await colorButtonElement.getCssValue('color');
    await driver.wait(async (d) => {
        const col: string = await colorButtonElement.getCssValue('color');
        return col !== color;

    }, 5000);
    console.log('initial color:' + color);
    console.log('color changed:' + await colorButtonElement.getCssValue('color'));
    driver.close();

}

async function runTest(): Promise<void> {
    /*   // Test different wait implementations
       console.log("=== Testing Implicit Wait ===");
       await implWaits();
   
       console.log("\n=== Testing Basic Fluent Wait (driver.wait) ===");
       await fluentWait();
   
       console.log("\n=== Testing Java-like FluentWait ===");
       await javaLikeFluentWait();
       */
    await colorChange();
}

runTest().catch(err => console.log(err));