const puppeteer = require('puppeteer');
const { func } = require('./func');

const ano = new Date().getFullYear().toString();

async function DIOGrande(nome) {
    let diarioOficial = new Object();
    let diarioAtual = new Object();

    const LINK_DOWNLOAD = "https://diogrande.campogrande.ms.gov.br";

    const NOME = nome.replace(/\s/g, "%20").toUpperCase();
    const LINK = `https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=${NOME}&numero=&de=&ate=`
    diarioOficial['link'] = LINK;

    const browser = await puppeteer.launch({
        // headless: false,
    });
    const page = await browser.newPage();
    await page.goto(LINK);
    let data;

    while (true) {
        data = await page.$$eval('table > tbody > tr', rows => {
            return rows.map(row => {
              const anchor = row.querySelector('a'); // Assuming you want the first <a> element in each row
              return {
                text: row.innerText.trim(), // Get the innerText of the row and trim any extra whitespace
                href: anchor ? anchor.getAttribute('href') : null // Get the href attribute of the <a> element, if exists
              };
            });
          });

        if ( data[0].text.includes('DOWNLOAD') ) {
            console.log("Tabela encontrada, analisando dados...");
            break;
        }
    }
    
    for (let i = 0; i < data.length; i++) {
        const link = data[i].href;
        const element = data[i].text.split('\t');
        for (let j = 0; j < element.length; j++) {
            if ( element[j].trim().includes(ano) ) {
                const numero = element[0];
                const tipo = element[1];
                const data = element[2];
                
                diarioAtual['tipo'] = tipo;
                diarioAtual['data'] = data;
                diarioAtual['link'] = LINK_DOWNLOAD+link;

                diarioOficial[numero] = diarioAtual;
                diarioAtual = {};
                break;
            }
        }
    }

    if (Object.keys(diarioOficial).length === 1) {
        diarioOficial['diario Oficial'] = 'Lamento informar que não foram encontrados Diários Oficiais Digitais associados ao seu nome até a presente data.';
    }
    
    await browser.close();
    return diarioOficial;
}
    
module.exports = { DIOGrande };

if (require.main === module) {
    func(DIOGrande);
}
