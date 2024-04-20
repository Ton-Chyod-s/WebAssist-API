const puppeteer = require('puppeteer');
const { main } = require('./mandarEmail');

let documento = "";

async  function DOE(nome) {
    const primeiroNome =  nome.split(' ')[0];
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.spdo.ms.gov.br/diariodoe');

    // Preencher um campo
    await page.type('[id="Filter_Texto"]', nome);
    // clicar
    await page.locator('button').click();
    
    // 'tbody'
    await page.waitForSelector('table[id="tbDiarios"]');

    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 500));

    const planilhaHTML = await page.$$eval('table[id="tbDiarios"] > tbody > tr ',rows => rows.map(element => element.innerText));
    for (let i = 0; i < planilhaHTML.length; i++) {
        const element = planilhaHTML[i];
        if (element.includes(2024) & element.includes(primeiroNome)) {
        const data = element.split(' - ')[0].split('\t')[1];
        const DOE = element.split(' - ')[1];
        documento += `${data}\t${DOE}\n`;
        }
    if (documento === "") {
        documento += `Não foi encontrado nenhum DOE com seu nome até o dia de hoje.`
    };
    }
    await browser.close();
}

async function run() {
    await DOE('Silvianny Aparecida Faria Camilo');
    // Envie o e-mail aqui, após o processamento de todas as informações.
    main(`${documento}`, "E-mail enviado com sucesso!!", "Diario Oficial MS", 'Silviannyfaria@gmail.com');
}

run();