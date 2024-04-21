const puppeteer = require('puppeteer');

async function DIOGrande() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://diogrande.campogrande.ms.gov.br/');

    await page.type('[id="searchPalavra"]', 'Klayton Chrysthian Oliveira Dias');

    const botaoBuscar = await page.evaluateHandle(() => {
        const xpath = '//*[@id="BotaoBuscarForm"]/span/span[2]';
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    });
    
    await botaoBuscar.click();
      
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    
    while (true) {
        await page.waitForSelector('div');
        const spansText = await page.$$eval('div', spans => spans.map(span => span.innerText));
    
        if (spansText.includes('Exibindo página 1 de 4 ...')) {
            console.log("Exibindo página 1 de 4 ... encontrado!");
            break;
        } else {
            console.log("Exibindo página 1 de 4 ... não encontrado!");
        }
    }
    
   
    
    const elementosTabela = await page.$$('#SearchTableDiogrande tbody > tr');
    if (elementosTabela.length > 0) {
        console.log('Encontrado');
    };
    
    
    
    const planilhaHTML = await page.$$eval('#SearchTableDiogrande tbody > tr > td', rows => rows.map(row => row.innerText));
    for (let i = 0; i < planilhaHTML.length; i++) {
        console.log(planilhaHTML[i]);
    }
        
}
    
 
module.exports = { DIOGrande };

DIOGrande();