const axios = require('axios');
const cheerio = require('cheerio');

var datetime = new Date();
const countries = [];

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    $('.title').each(
        (i, item) => countries.push({texto: $(item).text().trim()
        })
    );
    
    ano = datetime.toISOString().slice(0,10).split('-')[0]
    mes = datetime.toISOString().slice(0,10).split('-')[1]
    dia = datetime.toISOString().slice(0,10).split('-')[2]
    
    for (let i = 0; i < countries.length; i++) {
        
    }
    
}
 
scrap();
