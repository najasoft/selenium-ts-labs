import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import { Select } from "selenium-webdriver/lib/select";
import { SoftAssert } from "../utils/SoftAssert";
import { Index } from "selenium-webdriver/bidi";
const url: string = 'https://demoqa.com/select-menu';

async function select_test1(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(url);
    const lstColors: WebElement = await driver.findElement(By.id('oldSelectMenu'));
    const select: Select = new Select(lstColors);
    await select.selectByIndex(3);
    console.log(`Colors count:${(await select.getOptions()).length}`)
    console.log(`Selected color:${await (await select.getFirstSelectedOption())?.getText()}`)
    await select.selectByVisibleText('White');

}

async function select_muultiple_test(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(url);
    ;
    //Select the Standard Multi-Select using the element id.
    const lstCarsElement: WebElement = await driver.findElement(By.id('cars'));

    //Verifying that the element is multi-select.
    const lstCars: Select = new Select(lstCarsElement);
    /* 
       This wait condition is mandatory; otherwise, isMultiple() may return false
       due to the element not being fully initialized.
       An alternative workaround would be to iterate through lstCars options to ensure the select is ready.
    */
    await driver.wait(async (): Promise<boolean> => {
        const options = await lstCars.getOptions();
        return options.length > 0;

    }, 5000, 'The multiple attribute was not present within timeout');

    const isMultiple: boolean = await lstCars.isMultiple();

    if (isMultiple) {
        //  Select 'Opel' using the index and deselect the same using index.
        console.log('Selecting Opel option');
        const opel_index: number = 2;
        lstCars.selectByIndex(opel_index);
        const opelOption: WebElement | undefined = await lstCars.getFirstSelectedOption();
        console.log(opelOption ? await opelOption.getText() + " selected" : "Opel option not found");
        await lstCars.deselectByIndex(opel_index);
        const assert: SoftAssert<string> = new SoftAssert();
        const isOpelNotSelected: boolean = opelOption === undefined ? true : ! await opelOption.isSelected();
        assert.ok(isOpelNotSelected, 'Opel option should not be selected');

        //Select 'Saab' using value and deselect the same using value.
        const saab: string = 'Saab';
        console.log('Selecting Saab element');
        await lstCars.selectByVisibleText(saab);
        const saabElement: WebElement | undefined = await lstCars.getFirstSelectedOption();
        console.log(`${await (await lstCars.getFirstSelectedOption())?.getText()} element selected`);
        await lstCars.deselectByVisibleText(saab);
        const isSaabSelected: boolean = (saabElement === undefined) ? false : await saabElement.isSelected();
        assert.ok(!isSaabSelected, 'Saab Element should not be selected');

        //Deselect all the options.
        await lstCars.deselectAll();
        driver.close();


    }


}

async function runTest(): Promise<void> {
    await select_muultiple_test();
}

runTest().catch(err => console.log("Erreur:" + err));
