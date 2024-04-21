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
        await page.waitForSelector('span');
        const spansText = await page.$$eval('span', spans => spans.map(span => span.innerText));
    
        if (spansText.includes('Aguarde, carregando edições ...')) {
            console.log("Aguarde, carregando edições ... encontrado!");
        } else {
            console.log("Aguarde, carregando edições ... não encontrado!");
            break;
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