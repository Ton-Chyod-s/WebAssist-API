const puppeteer = require('puppeteer');

const ano = new Date().getFullYear().toString();

async function DOE(nome) {
    let head = "";
    let documento = "";

    const primeiroNome =  nome.split(' ')[0];
    const browser = await puppeteer.launch({
        // headless: false,
        product: 'chrome'
    });
    const page = await browser.newPage();
    await page.goto('https://www.spdo.ms.gov.br/diariodoe');

    await page.type('[id="Filter_Texto"]', nome);
    await page.locator('button').click();
    await page.waitForSelector('table[id="tbDiarios"]');
    await new Promise(resolve => setTimeout(resolve, 500));

    const planilhaHTML = await page.$$eval('table[id="tbDiarios"] > tbody > tr ',rows => rows.map(element => element.innerText));

    for (let i = 0; i < planilhaHTML.length; i++) {
        const element = planilhaHTML[i];
        if (element.includes(ano) && element.includes(primeiroNome)) {
        const data = element.split(' - ')[0].split('\t')[1];
        const DOE = element.split(' - ')[1];
        documento += `<p>${data}    ${DOE}</p>`;
        }
    };
    head += `<p>Nome: ${nome}   Ano: ${ano}</p>`;
    if (documento.length === 0) {
        documento += `${head}Lamento informar que não foram encontrados Diários Oficiais Eletrônicos (DOEs) associados ao seu nome até a presente data.`;
    } else {
        documento = head + documento;
    }
    await browser.close();
    return documento;
}

module.exports = { DOE };

if (require.main === module) {
    async function Testando () {
        const haha = await DOE('hahahaha')
        console.log(haha)
    }
    Testando()
}