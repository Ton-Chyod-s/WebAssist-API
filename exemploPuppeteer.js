const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');

    // Preencher um campo
  await page.type('[class="gLFyf"]', 'lol');

  // Clicar em um botão
 await page.click('[class="gNO89b"]');

  `
  // Aguardar um pouco
  await page.waitForTimeout(2000);

  await browser.close();`
})();
