const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.spdo.ms.gov.br/diariodoe');

  // Preencher um campo
  await page.locator('input').fill('lol');


  // await page.locator('input').click();
  

  `
  // Aguardar um pouco
  await page.waitForTimeout(2000);

  await browser.close();`
})();
