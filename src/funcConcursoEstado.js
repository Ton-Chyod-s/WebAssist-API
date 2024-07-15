const axios = require('axios');
const cheerio = require('cheerio');

let dictData = new Object();

async function concursoEstado() {
    const LINK_SITE = "http://www2.concursos.ms.gov.br/"

    const LINK = "http://www2.concursos.ms.gov.br/?location=editais"
    dictData['link'] = LINK;
    
    const response = await axios.get(LINK);
    const site = response.data

    initial_tag = site.indexOf(`<span class="formataTitulos"><br>"NOVO"</span>`) + `<span class="formataTitulos">"NOVO"</span>`.length;
    
    final_tag = site.indexOf(`<span class="formataTitulos">EM ANDAMENTO</span>`) + `<span class="formataTitulos">EM ANDAMENTO</span>`.length;

    const concursos_tag = site.slice(initial_tag, final_tag);
    const $ = cheerio.load(concursos_tag)

    const cards = $('span[class="formataCampos"] a').map((i, item) => ({
        texto: $(item).text().trim(),
        site: $(item).attr('href')
    })).get();

    for (let i = 0; i < cards.length; i++) {
        const concurso = cards[i].texto
        const link = LINK_SITE + cards[i].site

        dictData[concurso] = {site: link}
    }
    
    return dictData;
}

module.exports = { concursoEstado }

if (require.main === module) {
    const lista = process.env.LIST_NAME_SCRAPINING.split(',');

    // Iterar de 0 em 3 para processar triples (nome, email, cond)
    for (let i = 0; i < lista.length; i += 3) {
        const nome = lista[i];
        const email = lista[i + 1];
        const cond = lista[i + 2];

        if ( cond === 'false' ) {
            (async function Testando () {
                const test = await concursoEstado()
                console.log(test)
            })();
            
        } else {
            
            (async function Testando () {
                const test = await concursoEstado()
                console.log(test)
            })();

        }   
    }
}
