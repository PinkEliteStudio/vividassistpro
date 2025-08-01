const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file://<path-to-your-html>/5_AI_Powered_Strategies_Guide.html', { waitUntil: 'networkidle0' });
    await page.pdf({ path: 'public/5_AI_Powered_Strategies_Guide.pdf', format: 'A4' });
    await browser.close();
})();
