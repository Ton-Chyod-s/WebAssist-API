const axios = require('axios');
const cheerio = require('cheerio');

async function concursoEstado() {
    const response = await axios.get("http://www2.concursos.ms.gov.br/?location=editais");
    const $ = cheerio.load(response.data);
    const cards = $('a').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].texto.includes('PROCESSO SELETIVO SIMPLIFICADO') || cards[i].texto.includes('Processo Seletivo Simplificado')) {
            console.log(cards[i].texto)
        }
    }
}

module.exports = {concursoEstado }

if (require.main === module) {
    async function lol () {
        const haha = await concursoEstado()
        console.log(haha)
    }
    lol()
}