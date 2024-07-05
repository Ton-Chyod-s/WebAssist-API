const axios = require('axios');
const cheerio = require('cheerio');

async function funcDioGrande(nome) {
    nome = nome.replace(/\s/g, '%20').toUpperCase();
    const site = `https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=${nome}&numero=&de=&ate=`;
    const response = await axios.get(site);
    const $ = cheerio.load(response.data);

    let cont = 0;

    while (true) {
        
        const cards = $('table[id="SearchTableDiogrande"]').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();

        const ultimaPosicao = cards.length - 1;

        if ( ultimaPosicao === 0 ) {
            continue;
        } else {
            cont = 1;
        }

        if (cont !== 0) {
            break;
        }
            
    }
    
    

    console.log(cards);


}   




const lohahahal = fetch('https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=silvianny%20aparecida%20faria%20camilo&numero=&de=&ate=')


const lol = 'lol'

// if (require.main === module) {
//     async function test() {
//         const result = await funcDioGrande('silvianny aparecida faria camilo');
//         console.log(result);
//     }
//     test()
// }
