import { By, WebDriver, WebElement } from "selenium-webdriver";
import { Page } from "../commons/Page";

export class OverlappedElementPage extends Page {


    private idFieldBy: By = By.css('#id');
    private nameFieldBy: By = By.css('#name');
    private subjectFieldBy: By = By.css('#subject');


    async formFill(): Promise<void> {
        const driver: WebDriver = await this.getDriver();
        const idField: WebElement = await driver.findElement(this.idFieldBy);
        const nameField: WebElement = await driver.findElement(this.nameFieldBy);
        const subjectField: WebElement = await driver.findElement(this.subjectFieldBy);
        await driver.executeScript("arguments[0].scrollIntoView(true);", idField);
        await idField.sendKeys("775655T77");
        await driver.executeScript("arguments[0].scrollIntoView(true);", nameField);
        await nameField.sendKeys("Johana");
        await driver.executeScript("arguments[0].scrollIntoView(true);", subjectField);
        await subjectField.sendKeys("This is a real test");
        await driver.executeScript("arguments[0].scrollIntoView(true);", idField);
        const id: string = await idField.getAttribute("value");
        console.log(id);
        await driver.executeScript("arguments[0].scrollIntoView(true);", nameField);
        const name: string = await nameField.getAttribute("value");
        console.log(name);
        await driver.executeScript("arguments[0].scrollIntoView(true);", subjectField);
        const subject: string = await subjectField.getAttribute("value");
        console.log(subject);
    }





}