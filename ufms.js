const axios = require('axios');
const cheerio = require('cheerio');

const countries = [];

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    $('.glyphicon glyphicon-check').each(
        (i, item) => countries.push({name: $(item).text().trim()
        })
    );
    console.log(countries)
}
 
scrap();
