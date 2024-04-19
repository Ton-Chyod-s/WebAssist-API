const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.spdo.ms.gov.br/diariodoe');

  // Preencher um campo
  await page.type('[id="Filter_Texto"]', 'Klayton Chrysthian Oliveira Dias');
  // clicar
  await page.locator('button').click();
  
  // 'tbody'
  await page.waitForSelector('tbody');
  const planilhaHTML = await page.$eval('tbody', element => element.outerHTML);
  for (let i = 0; i < planilhaHTML.length; i++) {
    console.log(planilhaHTML[i])
  }

  `
  // Aguardar um pouco
  await page.waitForTimeout(2000);

  await browser.close();`
})();
