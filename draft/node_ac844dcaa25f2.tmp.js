const puppeteer = require('puppeteer');

async function DIOGrande() {
    const browser = await puppeteer.launch({
        // headless: false,
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
    
    while (true) {
        const elementosTabela = await page.waitForSelector('#SearchTableDiogrande tbody > tr > td');
        if (elementosTabela.length > 0) {
            // Se os elementos estiverem prontos, extrair o texto
            const planilhaHTML = await page.$$eval('#SearchTableDiogrande tbody > tr > td', rows => rows.map(row => row.innerText));
            for (let i = 0; i < planilhaHTML.length; i++) {
                console.log(planilhaHTML[i]);
            }
            break; // Sai do loop
        }
        
    
    }
}   
    

module.exports = { DIOGrande };

DIOGrande();