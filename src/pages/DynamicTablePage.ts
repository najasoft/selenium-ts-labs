import { By, until, WebDriver, WebElement } from "selenium-webdriver"
import { Page } from "../commons/Page"

/*
Scenario 6:
For Chrome process get value of CPU load.
Compare it with value in the yellow label.
*/
export class DynamicTablePage extends Page {

    private yellowLabelBy: By = By.css('.bg-warning');
    //private columnHeadersBy: By = By.xpath("//span[@role='columnheader']");
    private columnHeadersBy: By = By.css("span[role='columnheader']");
    private tableLinesBy: By = By.css("div[role='row']");
    private cellsLineBy: By = By.css("span[role='cell']");


    async getCellValue(processName: string, columnName: string): Promise<string> {
        const driver: WebDriver = await this.getDriver();
        // 1. Locate column index
        const columnHeaders: WebElement[] = await driver.findElements(this.columnHeadersBy);
        let columnIndex: number = -1;
        for (let i = 0; i < columnHeaders.length; i++) {
            const valueColumn: string = await columnHeaders[i].getText();
            if (valueColumn.trim() === columnName.trim()) {
                columnIndex = i;
                break;
            }
        }
        if (columnIndex === -1) {
            throw new Error(`Column "${columnName}" not found.`);
        }
        //2. Locate the row for the given process name
        const rows: WebElement[] = await driver.findElements(this.tableLinesBy);
        for (const row of rows) {
            const cells = await row.findElements(this.cellsLineBy);
            if (cells.length === 0) continue;
            const rowLabel = await cells[0].getText();
            if (rowLabel.trim() === processName.trim())
                return (await cells[columnIndex].getText()).trim();
        }

        throw new Error(`Row for process ${processName} not found`);
    }


    async getYelloLabelText(): Promise<string> {

        const yellowLabel: WebElement = await (await this.getDriver()).findElement(this.yellowLabelBy);
        const yellowLabelText: string = await yellowLabel.getText();
        return yellowLabelText.trim();
    }


}