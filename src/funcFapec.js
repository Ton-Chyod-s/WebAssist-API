const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();
const mes = '0' + (new Date().getMonth() + 1).toString();
const dia = new Date().getDate().toString();
const hojeData = `${dia}/${mes}/${ano}`

let dictFapec = {};
let dictConteudo = {};

async function fapec() {
    const site = "https://fapec.org/processo-seletivo/";
    dictFapec['site'] = site

    const response = await axios.get(site);
        const $ = cheerio.load(response.data);
        const cards = $('button[data-toggle="collapse"]').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();

        for (let i = 0; i < cards.length; i++) {
            const element = cards[i].texto
            if ( cards[i].texto.includes('Inscrições abertas') && cards[i].texto.includes(hojeData) ) {
                const elementSplit = element.split('-');
                const element0 = elementSplit[0];
                const element1 = elementSplit[1];
                const element2 = elementSplit[2];

                dictConteudo['tempo'] = element1;
                dictConteudo['cargo-data'] = element2;
                dictFapec[element0] = dictConteudo;
                dictConteudo = {};
            } 
        }

        if ( Object.keys(dictFapec).length === 1 ) {
            dictConteudo['cargo-data'] = 'Não há concursos abertos';
            dictFapec['Erro!'] = dictConteudo;
        }
        return dictFapec;
    }

module.exports = { fapec }

if (require.main === module) {
    async function Testando () {
        const haha = await fapec()
        console.log(haha)
    }
    Testando()
}
