import { By, until, WebDriver } from "selenium-webdriver";
import { Page } from "../commons/Page";

export class ClassAttributePage extends Page {


    private classAttributeSectionBy: By = By.linkText("Class Attribute");

    private blueButtonBy: By = By.css(".btn-primary");

    async gotoClassAttributeSection(): Promise<void> {
        const driver: WebDriver = await this.getDriver();
        await driver.findElement(this.classAttributeSectionBy).click();
    }

    async isBlueButtonVisible(): Promise<boolean> {
        const driver: WebDriver = await this.getDriver();
        const blueButton = await driver.findElement((this.blueButtonBy));
        return await blueButton.isDisplayed();
    }

    async clickBlueButton(): Promise<string> {
        const driver: WebDriver = await this.getDriver();
        const blueButton = await driver.findElement(this.blueButtonBy);
        await blueButton.click();
        await driver.wait(until.alertIsPresent(), 5000);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        await alert.accept();
        return alertText;

    }

    /*
    
        async alertIsClosed(): Promise<boolean> {
            const driver: WebDriver = await this.getDriver();
            await driver.wait(until.stalenessOf(alertEl), 5000);
            try {
                await driver.switchTo().alert();
                return false; // Alert is still present
            }
            catch (error) {
                return true; // Alert is closed
            }
        }
            */






}