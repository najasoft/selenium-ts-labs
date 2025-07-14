import { WebDriver } from "selenium-webdriver";
import { Page } from "../commons/Page"
import { ClassAttributePage } from "../pages/ClassAttributePage";
import { strictEqual } from "assert/strict";
import { ClientSideDelayPage } from "../pages/ClientSideDelayPage";
import { LoadDelayPage } from "../pages/LoadDelayPage";
import { OverlappedElementPage } from "../pages/OverlappedElementPage";
import { DynamicTablePage } from "../pages/DynamicTablePage";


let classAttributePage: ClassAttributePage | undefined;


// Class Attribute Verification
async function scenario1(): Promise<void> {

    try {
        classAttributePage = new ClassAttributePage();
        await classAttributePage.open('/home');
        await classAttributePage.gotoClassAttributeSection();

        strictEqual<true>(await classAttributePage.isBlueButtonVisible(), true, "Blue button should be visible...");


    }
    catch (error) {
        console.error("Error in scenario1:", error);
    } finally {
        if (typeof classAttributePage !== "undefined")
            await classAttributePage.close();

    }
}

// Open Class Attribute section and create script that verify that the blue button is visible.
async function scenario2(): Promise<void> {
    try {
        classAttributePage = new ClassAttributePage();
        await classAttributePage.open('/home');
        await classAttributePage.gotoClassAttributeSection();
        const alertText: string = await classAttributePage.clickBlueButton();
        console.log("Alert text:", alertText);
        strictEqual(alertText, "Primary button pressed", `Alert text should be "Primary button pressed", but got "${alertText}"`);
    }
    catch (error) {
        console.error("Error in scenario2:", error);
    } finally {
        if (typeof classAttributePage !== "undefined")
            await classAttributePage.close();
    }


}

// Client-Side Delay Testing
/* Some elements may appear after client-side time consuming JavaScript calculations*/
async function scenario3(): Promise<void> {
    const clientSideDelayPage: ClientSideDelayPage = new ClientSideDelayPage();
    try {
        await clientSideDelayPage.open('/clientdelay');
        const greenLabelText: string = await clientSideDelayPage.clickBlueButton();
        const expectedGreenLabelText: string = "Data calculated on the client side.";
        strictEqual(greenLabelText, expectedGreenLabelText, `"${expectedGreenLabelText}" is expected but got "${greenLabelText}"`);

    }
    catch (error) {
        console.log(`Scenario 3 failed: ${error}`)
        clientSideDelayPage.close();
    }

    finally {
        clientSideDelayPage.close();
    }
}

//Load Delay Verification
/*
**Scenario:** Open Load Delay section and verify the "Button Appearing After Delay" button is visible.
* Ensure that a test is capable of waiting for a page to load
*/
async function scenario4(): Promise<void> {
    const loadDelayPage: LoadDelayPage = new LoadDelayPage();
    const buttonText: string = await loadDelayPage.loadPage();
    const expectedText: string = 'Button Appearing After Delay';
    strictEqual(buttonText, expectedText, `${expectedText} is expected but got ${buttonText} `)
}
// Overlapped Element Handling
/*
**Scenario:** Open Overlapped Element section and set a random Id and Name, then validate the form retains the information.

*/
async function scenario5(): Promise<void> {

    const overlappedElementPage: OverlappedElementPage = new OverlappedElementPage();
    try {
        await overlappedElementPage.open('/overlapped');
        await overlappedElementPage.formFill();

    }
    catch (error) {
        console.log(`Scenario 5 error : ${error}`);
    }
    finally {
        overlappedElementPage.close();
    }

}

// Dynamic Table Data Validation
/*
**Scenario:** Open Dynamic Table section and take chrome process value of CPU load (value is in the table),
 then compare it with the value in the yellow label and verify both values match.
*/
async function scenario6(): Promise<void> {
    const dynamicTablePage: DynamicTablePage = new DynamicTablePage();
    const process = "Chrome";
    const column = "CPU";

    try {
        await dynamicTablePage.open('/dynamictable');
        const cellValue: string = await dynamicTablePage.getCellValue(process, column);
        console.log(`Cell value: ${cellValue}`);
        const expectedValue: string = await dynamicTablePage.getYelloLabelText();
        const actualValue: string = `${process} ${column}: ${cellValue}`;
        console.log(`Yellow Label Text:${expectedValue}`);
        strictEqual(actualValue, expectedValue, `expected ${expectedValue}, but got ${actualValue} `);


    }
    catch (error) {
        console.log(`Scenario 6 failed: + ${error}`);
    }
    finally {
        dynamicTablePage.close();
    }
}


scenario6().catch(error => {
    console.error("Error executing scenario6:", error);
});

