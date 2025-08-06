import { Browser, Builder, By, WebDriver, WebElement } from "selenium-webdriver";

const iframesUrl: string = 'https://demoqa.com/frames ';
const qaDemoUrl: string = 'https://demoqa.com/';
const framesUrl: string = 'https://demoqa.com/frames';
const nestedFramesUrl: string = 'https://demoqa.com/nestedframes';

async function iFramesCount(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(iframesUrl);
    // Total number of frames
    const framesCount: number = await driver.executeScript("return window.length");
    console.log(`Number of frames:${framesCount}`);

    // Sample Heading
    await driver.switchTo().frame('frame1');
    const sampleHeading: WebElement = await driver.findElement(By.id('sampleHeading'));
    const sampleHeadingText: string = await sampleHeading.getText();
    console.log(`h1 text inside frame 1:${sampleHeadingText}`);
    await driver.switchTo().defaultContent();

    driver.close();

}

async function nestedFrames(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(nestedFramesUrl);
    // Frames count
    const framesCountJavascript: number = await driver.executeScript('return window.length');
    const framesCountSelenium: number = (await driver.findElements(By.css('iframe'))).length;
    console.log(`iFames count, Javascript:${framesCountJavascript},Selenium:${framesCountSelenium}`);

    // locate frame1
    await driver.switchTo().frame('frame1');
    const frame1Body: WebElement = await driver.findElement(By.css('body'));
    const frame1Text: string = await frame1Body.getText();
    console.log(`Frame 1 body:${frame1Text}`);
    // frame1 iframe count
    const iframeFrame1Count = (await driver.findElements(By.css('iframe'))).length;
    console.log(`frame 1 iframe's count:${iframeFrame1Count}`);
    // Switch to the child frame
    console.log('Switching to the first child frame of frame1 ');
    await driver.switchTo().frame(0);
    // Count of iframe in frame2
    const iframeFrame2Count = (await driver.findElements(By.css('iframe'))).length;
    console.log(`frame 2 iframe's count:${iframeFrame2Count}`);
    const frame2Text = await (await driver.findElement(By.css('body'))).getText();
    console.log('Frame 2 content:' + frame2Text);
    // Swtich to parent iframe
    await driver.switchTo().parentFrame();
    const parentFrameText: string = await (await driver.findElement(By.css('body'))).getText();
    console.log('Parent iFrame content:' + parentFrameText);

    // Switch to default content 'main page)
    await driver.switchTo().defaultContent();

    // Heading of the main page
    const headingElement: WebElement = await driver.findElement(By.css('#framesWrapper > h1'));
    const headingText: string = await headingElement.getText();
    console.log(`Heading text:${headingText}`);
    driver.close();
}

// Dynamic frames
async function dynamicFramse(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(iframesUrl);
    // Total number of frames
    const framesCount: number = await driver.executeScript("return window.length");




}
async function runTests(): Promise<void> {
    await iFramesCount();
    await nestedFrames();
}

runTests().catch(err => console.log(`Exception:${err}`));
