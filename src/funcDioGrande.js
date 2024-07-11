const puppeteer = require('puppeteer');

const ano = new Date().getFullYear().toString();

async function DIOGrande(nome) {
    let diarioOficial = new Object();
    let diarioAtual = new Object();

    const NOME = nome.replace(/\s/g, "%20").toUpperCase();
    const LINK = `https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=${NOME}&numero=&de=&ate=`
    diarioOficial['link'] = LINK;

    const browser = await puppeteer.launch({
        // headless: false,
    });
    const page = await browser.newPage();
    await page.goto(LINK);
    let spansText;
    let spansHref;

    while (true) {
        // await page.waitForSelector('table > tbody > tr');
        spansText = await page.$$eval('table > tbody > tr', spans => spans.map(span => span.innerText));

        if ( spansText[0].includes('DOWNLOAD') ) {
            console.log("Tabela encontrada, analisando dados...");
            break;
        }
    }
    
    for (let i = 0; i < spansText.length; i++) {
        const element = spansText[i].split('\t');
        for (let j = 0; j < element.length; j++) {
            if ( element[j].trim().includes(ano) ) {
                const numero = element[0];
                const tipo = element[1];
                const data = element[2];
                diarioAtual['tipo'] = tipo;
                diarioAtual['data'] = data;

                diarioOficial[numero] = diarioAtual;
                diarioAtual = {};
                break;
            }
        }
    }

    if (Object.keys(diarioOficial).length === 1) {
        diarioAtual['erro'] = 'Lamento informar que não foram encontrados Diários Oficiais Digitais associados ao seu nome até a presente data.';
        diarioOficial['diario Oficial'] = diarioAtual;
    }
    

    await browser.close();
    return diarioOficial;
}
    
module.exports = { DIOGrande };

if (require.main === module) {
    (async () => {
        // const nome = "delmar silva dias";
        const nome = "silvianny aparecida faria camilo"
        // const nome = "klayton chrysthian oliveira dias";
        // const nome = "Andreza Gabriela Leão Alves";
        // const nome = "Ronaldo dos Santos";
        const diario = await DIOGrande(nome);
        console.log(diario);
    })();
}
