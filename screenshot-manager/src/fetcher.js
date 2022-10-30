import puppeteer from 'puppeteer';
import * as cache from './imageCache.js'
export async function capture_screenshot(url) {
    try{
        let app_name = url.split('id=')[1]
        const browser = await puppeteer.launch({args: ['--start-maximized']});
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({path:`./screenshot-manager/screenshots/${app_name}-${Date.now()}.png`, fullPage: true})
        await browser.close();
        cache.update_cache(app_name)
    }
    catch (e) {
     console.log(`Failed to capture screenshot within URL ${url}`)
     throw e;
    }

}