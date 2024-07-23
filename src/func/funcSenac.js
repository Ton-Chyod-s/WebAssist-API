const cheerio = require('cheerio');
const axios = require('axios');
const https = require('https');
const { link } = require('fs');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function funcSenac() {

    const LINK_SITE = 'https://ms.senac.br/site/vagas'

    const reponse = await axios.get(LINK_SITE, { httpsAgent });
    const site = reponse.data;

    initial_tag = site.indexOf(`<h5>Em Campo Grande</h5>`) + `<h5>Em Campo Grande</h5>`.length;

    final_tag = site.indexOf(`<h5>Em Corumbá</h5>`) + `<h5>Em Corumbá</h5>`.length;

    const concursos_tag = site.slice(initial_tag, final_tag);

    const $ = cheerio.load(concursos_tag);

    // Obtemos todos os textos dos elementos div
    const cardValues = $('div').map((_, element) => $(element).text().trim()).get();

    // Obtemos todos os links dos elementos a
    const linkValues = $('a').map((_, element) => $(element).attr('href')).get();

    // Associamos cada card ao próximo link na lista
    const cardsWithLinks = cardValues.map((text, index) => ({
        value: text,
        link: linkValues[index] || null // Usa o link correspondente ou null se não houver link suficiente
    }));

    console.log(cardsWithLinks);

    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        console.log(element.value)
    
    }

}

module.exports = { funcSenac }

if (require.main === module) {
    funcSenac(funcSenac)
}