const axios = require('axios');
const cheerio = require('cheerio');

async function seges() {
    const response = await axios.get("https://www.campogrande.ms.gov.br/seges/processoseletivo/");
    const $ = cheerio.load(response.data);
    const cards = $('h4').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    const liCards = $('ul').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();    
    for (let i = 0; i < liCards.length; i++) {
        for (const key in liCards[i]) {
            const element = liCards[i][key];
            if (element.includes('Edital Processo Seletivo') && !element.includes('Inscrições encerradas')) {
                console.log(element)
            } 
        }
    }
}

module.exports = { seges }

seges()