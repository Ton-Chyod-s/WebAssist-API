const puppeteer = require('puppeteer');
const { main } = require('./mandarEmail');

let head = "";
let documento = "";
const ano = new Date().getFullYear().toString();

async function DOE(nome) {
    const primeiroNome =  nome.split(' ')[0];
    const browser = await puppeteer.launch({
        // headless: false,
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
        if (element.includes(ano) & element.includes(primeiroNome)) {
        const data = element.split(' - ')[0].split('\t')[1];
        const DOE = element.split(' - ')[1];
        documento += `${data}\t${DOE}\n`;
        }
    };
    if (documento.length === 0) {
        documento += `Lamentamos informar que não foram encontrados Diários Oficiais Eletrônicos (DOEs)\nassociados ao seu nome até a presente data.`;
    } else {
        head += `Diário Oficial do Estado de Mato Grosso do Sul\n\nNome: ${nome}\nAno: ${ano}\n\n`;
        documento = head + documento;
    }
    await browser.close();
    return documento;
}

async function run() {
    await DOE('Klayton Chrysthian Oliveira Dias');
    // Envie o e-mail aqui, após o processamento de todas as informações.
    main(`${documento}`, "E-mail enviado com sucesso!!", "Diario Oficial MS", 'hix_x@hotmail.com');
}

run();