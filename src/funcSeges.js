const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

let dictSeges = new Object();
let concursos = new Object();

async function seges() {
    const LINK = 'https://www.campogrande.ms.gov.br/seges/processoseletivo/'
    dictSeges['site'] = LINK;
    let response;
    let site;

    try {
        response = await axios.get(LINK);
        site = response.data
    } catch (error) {

    }
    initial_tag = site.indexOf(`<h2 style="text-align: center"><strong>      PROCESSOS SELETIVOS EM ANDAMENTO</strong></h2>`) + `<h2 style="text-align: center"><strong>      PROCESSOS SELETIVOS EM ANDAMENTO</strong></h2>`.length;

    final_tag = site.indexOf(`<h4 style="line-height: 33.599998px;font-family: Overpass, sans-serif"><strong>Processos Seletivos Encerrados – 2024:</strong></h4>`) + 
        `<h4 style="line-height: 33.599998px;font-family: Overpass, sans-serif"><strong>Processos Seletivos Encerrados – 2024:</strong></h4>`.length;

    const concursos_tag = site.slice(initial_tag, final_tag);
    const $ = cheerio.load(concursos_tag);





    const liCards = $('ul').map((i, item) => ({
        texto: $(item).text().trim(),
        href: $(item).find('a').attr('href')
    })).get(); 

    for (let i = 0; i < liCards.length; i++) {
        const element = liCards[i].texto.split(' – Inscrição');
        let element1;
        if ( element.length > 1) {
            element1 = element[0].split('–');
            concursos['vaga'] = (element1[1].trim())
            concursos['site'] = liCards[i].href
            dictSeges[element1[0]] = concursos
        }
    }
    return dictSeges;
}

module.exports = { seges }

if (require.main === module) {
    func(seges);
}
