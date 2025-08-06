// Import required Selenium WebDriver components and a custom SoftAssert utility
import { Alert, Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import { SoftAssert } from "../utils/SoftAssert";

// Define the URL of the test page
const alertsUrl: string = 'https://demoqa.com/alerts';

// Create a SoftAssert instance to collect non-blocking assertions
const assert: SoftAssert<string> = new SoftAssert<string>();

async function testJavaScriptAlerts(): Promise<void> {
    // Launch the Chrome browser and navigate to the alerts page
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(alertsUrl);

    // ===== 1. Handle Simple Alert =====
    const alertButton: WebElement = await driver.findElement(By.css('#alertButton'));
    await alertButton.click(); // triggers a simple alert

    await driver.wait(until.alertIsPresent()); // wait until alert appears
    const alertWindow: Alert = await driver.switchTo().alert();

    let message: string = await alertWindow.getText();
    console.log(message); // should be "You clicked a button"
    await alertWindow.accept(); // close the alert

    // Scroll down and remove overlay iframes (ads) to prevent UI blocking
    await driver.executeScript(`
        window.scrollBy(0, 300);
        document.querySelectorAll('iframe').forEach(f => f.remove());
    `);

    // ===== 2. Handle Prompt Alert =====
    // Ensure the prompt button is located and visible
    await driver.wait(until.elementLocated(By.id('promtButton')));
    const promptButton: WebElement = await driver.wait(
        until.elementIsVisible(await driver.findElement(By.id('promtButton')))
    );

    await promptButton.click();
    await driver.wait(until.alertIsPresent());
    const promptAlert: Alert = await driver.switchTo().alert();

    message = await promptAlert.getText();
    console.log(message); // should be prompt message like "Please enter your name"
    await promptAlert.sendKeys('John Doe');
    console.log(await promptAlert.getText()); // Optional: confirm entered value (may be same text)
    await promptAlert.accept();

    // ===== 3. Handle Confirm Alert =====
    const confirmButton: WebElement = await driver.findElement(By.id('confirmButton'));
    await confirmButton.click();

    await driver.wait(until.alertIsPresent());
    const confirmAlert: Alert = await driver.switchTo().alert();
    message = await confirmAlert.getText();
    console.log(message); // should be "Do you confirm action?"
    await confirmAlert.accept();

    // Validate result message (non-blocking with soft assert)
    const confirmBy: By = By.id('confirmResult');
    let confirmElement: WebElement | null = null;

    try {
        confirmElement = await driver.wait(until.elementLocated(confirmBy), 5000);
        confirmElement = await driver.wait(
            until.elementIsVisible(await driver.findElement(confirmBy)),
            5000
        );
    } catch (err) {
        confirmElement = null;
        console.log('Timeout:' + err);
    }

    if (!!confirmElement) {
        const confirmText: string = await confirmElement.getText();
        // Use soft assertion instead of throwing if condition fails
        assert.ok(
            confirmText.includes('You selected Ok'),
            "'You selected Ok' should be displayed"
        );
    }

    // ===== 4. Handle Delayed Alert (appears after 5 seconds) =====
    const timerButton: WebElement = await driver.findElement(By.id('timerAlertButton'));
    await timerButton.click();

    await driver.wait(until.alertIsPresent(), 6000); // allow some buffer > 5s
    const timerAlert: Alert = await driver.switchTo().alert();
    console.log(await timerAlert.getText());
    await timerAlert.accept();

    await driver.close();
}
//Unexpected alerts
async function unexpectedAlerts(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(alertsUrl);
    try {
        await driver.findElement(By.id('timerAlertButton'));
        await driver.wait(until.alertIsPresent(), 10000);
        const simpleAlert: Alert = driver.switchTo().alert();
        simpleAlert.accept();
        console.log('Simple alert accepted');
    }
    catch (err) {
        console.log('unexpected alert not present');
    }
    finally {
        driver.close();
    }
}

async function runTests(): Promise<void> {

    await unexpectedAlerts();
}

runTests().catch(err => `Error:${err}`);