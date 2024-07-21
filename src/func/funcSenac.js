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

    const cards = $('div').map((index, element) => {
        const $element = $(element);
        const text = $element.text().trim();
        const link = $element.find('div#collapse743 .panel-body ul li a').attr('href');
        
        return { 
            value: text, 
            link: link 
        };
    }).get();

    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        console.log(element.value)
    
    }

}

module.exports = { funcSenac }

if (require.main === module) {
    funcSenac(funcSenac)
}