const puppeteer = require('puppeteer');
const { func } = require('./func');

const ano = new Date().getFullYear().toString();

async function DOE(nome) {
    let dictDiario = new Object();
    let dictDoe = new Object();

    let cont = 0;

    const primeiroNome =  nome.split(' ')[0];
    const browser = await puppeteer.launch({
        // headless: false,
        product: 'chrome'
    });
    const page = await browser.newPage();
    await page.goto('https://www.spdo.ms.gov.br/diariodoe');
    dictDoe['link'] = 'https://www.spdo.ms.gov.br/diariodoe';
    dictDoe['nome'] = nome;

    await page.type('[id="Filter_Texto"]', nome);
    await page.locator('button').click();
    await page.waitForSelector('table[id="tbDiarios"]');
    await new Promise(resolve => setTimeout(resolve, 500));

    const planilhaHTML = await page.$$eval('table[id="tbDiarios"] > tbody > tr ',rows => rows.map(element => element.innerText));

    for (let i = 0; i < planilhaHTML.length; i++) {
        const element = planilhaHTML[i];

        let data = element.split(' - ')[0].split('\t')[1];
        if ( data === undefined ) {
            continue;
        }

        const boolean = element.includes( primeiroNome ) || element.includes( primeiroNome.toUpperCase() )

        if ( data.includes(ano) && boolean ) {
            const DOE = element.split(' - ')[1];
        
            dictDiario[`documento`] = DOE
            dictDiario[`data`] = data

            dictDoe[`diario-${cont}`] = dictDiario;
            dictDiario = new Object();
            cont++;
        } 
    };
    
    if ( Object.keys(dictDoe).length === 2 ) {
        dictDoe['erro!'] = `Lamento informar que não foram encontrados Diários Oficiais Eletrônicos (DOEs) associados ao seu nome até a presente data.`;

    } 

    await browser.close();
    return dictDoe;
}

module.exports = { DOE };

if (require.main === module) {

    func(DOE())

}