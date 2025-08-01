import { Builder, By, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import axios from 'axios';

async function checkLinksInNewTabs(url: string): Promise<void> {
    const options = new chrome.Options();
    // comment out headless if you want to debug visually
    options.addArguments('--headless=new', '--disable-gpu');

    const driver: WebDriver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get(url);

        // Accept cookies
        try {
            const allowCookiesBtn = await driver.findElement(By.id('CybotCookiebotDialogBodyButtonAccept'));
            await allowCookiesBtn.click();
            console.log('✅ Cookie consent accepted.');
        } catch (err) {
            console.warn('⚠️ Cookie consent button not found or already accepted.');
        }

        const mainWindow = await driver.getWindowHandle();

        const linkElements = await driver.findElements(By.css('a[href]'));
        const hrefs = new Set<string>();

        for (const link of linkElements) {
            const href = await link.getAttribute('href');
            if (href && href.startsWith('http')) {
                hrefs.add(href);
            }
        }

        console.log(`🔗 Total unique http(s) links: ${hrefs.size}`);

        for (const link of hrefs) {
            try {
                // Open in new tab
                await driver.executeScript(`window.open(arguments[0], '_blank');`, link);

                const tabs = await driver.getAllWindowHandles();
                const newTab = tabs.find(handle => handle !== mainWindow)!;

                await driver.switchTo().window(newTab);
                await driver.sleep(2000); // Wait for page load (can be replaced by WebDriverWait)

                // Check status
                const response = await axios.head(link, { maxRedirects: 5 });
                const status = response.status;

                if (status >= 400) {
                    console.error(`❌ Broken (${status}): ${link}`);
                } else {
                    console.log(`✅ OK (${status}): ${link}`);
                }

                await driver.close();
                await driver.switchTo().window(mainWindow);
            } catch (err: any) {
                console.error(`❌ Error on link: ${link} → ${err.message}`);
                await driver.switchTo().window(mainWindow);
            }
        }

    } finally {
        await driver.quit();
    }
}

checkLinksInNewTabs('https://www.sport-conrad.com/en/').catch(console.error);
