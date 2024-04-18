const axios = require('axios');
const cheerio = require('cheerio');

const countries = [];

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    $('.title').each(
        (i, item) => countries.push({texto: $(item).text().trim()
        })
    );
    console.log(countries)
}
 
scrap();
