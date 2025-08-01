import chrome from 'selenium-webdriver/chrome';
//const extensionPath: string = './extensions/ad_block.crx';
const extensionPath: string = './extensions/uBlock0_1.65.0.chromium.zip';


export function adBlock(options: chrome.Options): void {
    //options.addExtensions(extensionPath);
    options.addArguments(`--load-extension=${extensionPath}`);
};