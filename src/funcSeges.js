const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();
const mes = new Date().getMonth().toString();
const dia = new Date().getDate().toString();
const data = `${dia}/${mes}/${ano}`;

async function seges() {

    const LINK = 'https://www.campogrande.ms.gov.br/seges/processoseletivo/'
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
        texto: $(item).text().trim()
    })).get(); 

    for (let i = 0; i < liCards.length; i++) {
        const element = liCards[i].texto;
        if ( element.includes(ano) ) {
            console.log(element)
        }
    }
    
    




    
    
   

}

module.exports = { seges }

if (require.main === module) {
    (async () => {
        console.log(await seges());
    })();
}
