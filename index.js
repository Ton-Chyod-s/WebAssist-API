const axios = require('axios');
const cheerio = require('cheerio');

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna-e-reingresso-1o-semestre-de-2024/");
    console.log(response.data);
}
 
scrap();