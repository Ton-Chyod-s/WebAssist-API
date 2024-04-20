
const axios = require('axios');
const cheerio = require('cheerio');

let texto = "Aguardando..."

async function Exercito() {
    const response = await axios.get("https://9rm.eb.mil.br/index.php/oficial-tecnico-temporario");
    const $ = cheerio.load(response.data);
    const countries = $('p').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    for (let i = 0; i < countries.length; i++) {
        const anoAtual = new Date().getFullYear().toString();
        const paragrafo = countries[i]['texto']
        if (paragrafo.includes(anoAtual)) {
            texto = `<h4>Prepare-se e leia atentamente o edital da convocação. Boa sorte, guerreiro!</h4>\n\n${paragrafo}`
        }
    }
    return texto;
}

module.exports = { Exercito };