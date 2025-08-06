import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";

const booksUrl: string = 'https://demoqa.com/books';
const username = 'najasoft';
const password: string = 'Abcd@1234';


async function testCase1(): Promise<void> {
    const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get(booksUrl);

    const homePage: HomePage = new HomePage(driver);

    await homePage.loginClick();

    const loginPage: LoginPage = new LoginPage(driver);
    await loginPage.enterUserName(username);
    await loginPage.enterPassword(password);
    await loginPage.loginClick();
    const dashboardPage: DashboardPage = new DashboardPage(driver);
    const userNameText: string = await dashboardPage.getUserName();
    console.log(userNameText);
    const results: string[] = await dashboardPage.search('javascript');
    results.forEach(title => console.log(title));
    await dashboardPage.logoutClick();
    await driver.close();

}

testCase1().catch(err => `Errors: ${err}`);

