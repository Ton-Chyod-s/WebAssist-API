const axios = require('axios');
const cheerio = require('cheerio');

async function concursoEstado() {
    const site = 'http://www2.concursos.ms.gov.br/?location=editais <br><br>'
    let resposta = ""

    const response = await axios.get("http://www2.concursos.ms.gov.br/?location=editais");
    const $ = cheerio.load(response.data);
    const cards = $('a').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    for (let i = 0; i < 10; i++) {
        if (cards[i].texto.includes('PROCESSO SELETIVO SIMPLIFICADO') || cards[i].texto.includes('Processo Seletivo Simplificado')) {
            resposta += `${cards[i].texto}<br>`
        }
    }
    return `<strong>Site: </strong>${site + resposta}`
}

module.exports = { concursoEstado }

if (require.main === module) {
    async function Testando () {
        const haha = await concursoEstado()
        console.log(haha)
    }
    Testando()
}