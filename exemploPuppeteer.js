const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com.br/');

  // Clicar em um botão
  await page.click('#meuBotao');

  // Preencher um campo
  await page.type('#meuCampo', 'Texto para preencher o campo');

  // Aguardar um pouco
  await page.waitForTimeout(2000);

  await browser.close();
})();
