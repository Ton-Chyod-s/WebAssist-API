const axios = require('axios');
const cheerio = require('cheerio');

async function funcDioGrande(nome) {
    nome = nome.replace(/\s/g, '%20').toUpperCase();
    
    const response = await axios.get(`https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=` + nome + `&numero=&de=&ate=`);

    const $ = cheerio.load(response.data);
    
    console.log($);

    const cards = $('tr').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();

    console.log(cards);
 
}

if (require.main === module) {
    async function test() {
        const result = await funcDioGrande('silvianny aparecida faria camilo');
        console.log(result);
    }
    test()
}
