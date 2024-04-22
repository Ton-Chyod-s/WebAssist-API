const puppeteer = require('puppeteer');

async function DIOGrande(nome) {
    let diarioOficial = ""
    const browser = await puppeteer.launch({
        // headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://diogrande.campogrande.ms.gov.br/');

    await page.type('[id="searchPalavra"]', nome);

    const botaoBuscar = await page.evaluateHandle(() => {
        const xpath = '//*[@id="BotaoBuscarForm"]/span/span[2]';
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    });
    
    await botaoBuscar.click();
      
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    
    while (true) {
        await page.waitForSelector('table > tbody > tr');
        const spansText = await page.$$eval('table > tbody > tr', spans => spans.map(span => span.innerText));
    
        if (spansText.length > 1) {
            console.log("Tabela ... encontrado!");
            break;
        }
    }
    
    await page.$$('#SearchTableDiogrande tbody > tr');
        
    const planilhaHTML = await page.$$eval('#SearchTableDiogrande tbody > tr', rows => rows.map(row => row.innerText));
    for (let i = 0; i < planilhaHTML.length; i++) {
        if (i !== "DOWLOAD") {
            const planilhaSeparada = planilhaHTML[i].split("\t");
            const DIO = `${planilhaSeparada[0]} ${planilhaSeparada[1]} ${planilhaSeparada[2]}<br>`
            diarioOficial += DIO;
        }
    }
    await browser.close();
    return diarioOficial;
}
    
module.exports = { DIOGrande };

// async function run() {
//     const documentoDIO = await DIOGrande('Klayton Chrysthian Oliveira Dias');
//     console.log(documentoDIO);
// }
// run()