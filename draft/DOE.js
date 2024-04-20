const puppeteer = require('puppeteer');
const { main } = require('./mandarEmail');

let documento = "";
const dia = new Date().getDay().toString();
const mes = new Date().getMonth().toString();
const ano = new Date().getFullYear().toString();
const hora = new Date().getHours().toString();
const minuto = new Date().getMinutes().toString();

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.spdo.ms.gov.br/diariodoe');

  // Preencher um campo
  await page.type('[id="Filter_Texto"]', 'Klayton Chrysthian Oliveira Dias');
  // clicar
  await page.locator('button').click();
  
  // 'tbody'
  await page.waitForSelector('table[id="tbDiarios"]');

  // Aguardar um pouco
  await new Promise(resolve => setTimeout(resolve, 500));

  const planilhaHTML = await page.$$eval('table[id="tbDiarios"] > tbody > tr ',rows => rows.map(element => element.innerText));
  for (let i = 0; i < planilhaHTML.length; i++) {
    const element = planilhaHTML[i];
    if (element.includes(2024) & element.includes("Klayton")) {
      const data = element.split(' - ')[0].split('\t')[1];
      const DOE = element.split(' - ')[1];
      documento += `${data}\t${DOE}\n`;
    }
  if (documento === "") {
    documento += `Não foi encontrado nenhum DOE com seu nome até o dia de hoje.`
  };
  }
  
  // Envie o e-mail aqui, depois de processar todas as informações.
  main(`${documento}`,"E-mail enviado com sucesso!!","Diario Oficial MS","hix_x@hotmail.com");

  await browser.close();
})();
