const axios = require('axios');
const cheerio = require('cheerio');

async function seges() {
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

if (require.main === module) {
    async function Testando () {
        const haha = await seges()
        console.log(haha)
    }
    Testando()
}