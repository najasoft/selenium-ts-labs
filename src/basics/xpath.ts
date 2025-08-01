import chrome from 'selenium-webdriver/chrome';
import { adBlock } from '../utils/adBlock';
import { Browser, Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import fs from 'fs';


const textBoxUrl: string = "https://demoqa.com/text-box";
const webTableUrl: string = "https://demoqa.com/webtables";
const radioUrl: string = "https://demoqa.com/radio-button";

async function xpathTable1(): Promise<void> {

    const options: chrome.Options = new chrome.Options();
    adBlock(options);
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get(webTableUrl);
    // Opening tables
    //// Get the last node - Last val in table
    const elt: WebElement = await driver.findElement(By.xpath("//div[@class='rt-tr -odd']/div[last()]"));

    console.log(await elt.isDisplayed());
    const positionCol: boolean = await driver.findElement(By.xpath("//div[@class='rt-tr -odd']/div[position()='2']")).isDisplayed();
    console.log(positionCol);
    await driver.close();
}

// xpath functions: contains, startsWith, text
//operators: and  or 
/*xpath axis: ancestor, ancestor-or-self, attribute, child, descendnent , descendent-or-self, following, following-sibling
parent, preceding, self*/

async function xpathFunctions(): Promise<void> {
    const options: chrome.Options = new chrome.Options();
    adBlock(options);
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get(textBoxUrl);
    //Using contains() to locate full name and enter data
    driver.findElement(By.xpath("//input[contains(@id, 'userN')]")).sendKeys("Contains function");
    //using placeholder
    driver.findElement(By.xpath("//input[contains(@placeholder, 'example')]")).sendKeys("Using Placeholder");
    //using start-with() 
    driver.findElement(By.xpath("//input[starts-with(@placeholder,'Fu')]")).sendKeys("Using start with");
    //using text() to get label
    const text: string = await driver.findElement(By.xpath("//label[contains (text(),'Ema')]")).getText();
    console.log(text);
    //using AND operator to locate full name
    driver.findElement(By.xpath("//input[@placeholder ='Full Name' and @type = 'text']")).sendKeys("AND operator");

    //using OR operator to locate full name
    driver.findElement(By.xpath("//input[@placeholder ='Full Name' or @type = 'text']")).sendKeys("OR operator");
    //using ancestor to locate form tag
    const bol: boolean = await driver.findElement(By.xpath("//label[text()='Full Name']/ancestor::form")).isDisplayed();
    console.log("Form is displayed : " + bol);
    //using child to locate full name textbox from form
    const label: string = await driver.findElement(By.xpath("//form[@id='userForm']/child::div[1]//label")).getText();
    console.log(`Label: ${label}`);

    //  //using decendent axis to locate yes radio
    await driver.get(radioUrl);
    const elt: WebElement = await driver.findElement(By.xpath("//input[@id='yesRadio']/parent::div"));
    const result: string = await elt.takeScreenshot();
    const fileName: string = 'button.png';
    const buffer = Buffer.from(result, 'base64');
    await fs.promises.writeFile(fileName, buffer);

    console.log(await elt.isSelected());

    ////using following axis to locate current address
    await driver.navigate().back();
    await driver.findElement(By.xpath("//input[@id='userName']/following::textarea")).sendKeys("Text Area locate following");
    //using following-sibling to locate email 
    await driver.findElement(By.xpath("(//div[@class='col-md-3 col-sm-12']/following-sibling::div/input)[2]")).sendKeys("abc@xyz.com");

    //using preceding-axis to locate full name
    const preceding: string = await driver.findElement(By.xpath("//input[@id='userName']/preceding::label")).getText();
    console.log("The value of preceding : " + preceding);
    driver.close();


}


async function xpathTest1(): Promise<void> {
    const options: chrome.Options = new chrome.Options();
    adBlock(options);
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get(textBoxUrl);
    // Single slash “/” to validate image at start of page
    const logoLocator: By = By.xpath('/html/body/div/header/a/img');
    const logoElement: WebElement = await driver.findElement(logoLocator);
    let logoIsDisplayed: boolean = await logoElement.isDisplayed();
    console.log(logoIsDisplayed);
    //// Double slash “//” to validate image
    logoIsDisplayed = await driver.findElement(By.xpath("//img")).isDisplayed();
    console.log(logoIsDisplayed);

    // Address sign “@” full name textbox
    await driver.findElement(By.xpath("//input[contains(@id,'userN')]")).sendKeys("Doe");
    // // Dot “.” - Full name texbox
    await driver.findElement(By.xpath("//input[contains(@id,'userE')]/.")).sendKeys("joe");
    //// Double dot “..” - Full name label
    const fullNameLabel: string = await driver.findElement(By.xpath("//input[contains(@id,'userN')]/../../div/label")).getText();
    console.log(`${fullNameLabel}`);
    // Asterisk “*” - Full Name textbox
    await driver.findElement(By.xpath("//div[contains(@id, 'userName-wrapper')]/div[2]/*")).sendKeys("Full Name1");
    // Address and Asterisk “@*” - full name text box
    await driver.findElement(By.xpath("//input[@*= 'userName']")).sendKeys("Full Name");

    // Pipe “|” - to locate both full name and Email label
    const lst: WebElement[] = await driver.findElements(By.xpath("//label[@*= 'userName-label']|//label[@*= 'userEmail-label']"));

    for (const elt of lst) {
        console.log(await elt.getText());
    }
    await driver.close();

}

async function runTest(): Promise<void> {
    await xpathFunctions();
};

runTest().catch((er) => console.log(`Erreur:${er}`));