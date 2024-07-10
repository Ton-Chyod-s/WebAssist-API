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
                console.log(element)

            } 
        }

        if ( dictConteudo.length !== 0 ) {
            dictConteudo['Erro!'] = 'Não há concursos abertos'
        }
        
        dictFapec['conteudo'] = dictConteudo
        
        
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
