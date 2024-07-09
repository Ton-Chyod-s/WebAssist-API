const axios = require('axios');
const cheerio = require('cheerio');

async function concursoEstado() {
    const response = await axios.get("http://www2.concursos.ms.gov.br/?location=editais");
    const site = response.data

    initial_tag = site.indexOf(`<span class="formataTitulos"><br>"NOVO"</span>`) + `<span class="formataTitulos">"NOVO"</span>`.length;
    
    final_tag = site.indexOf(`<span class="formataTitulos">EM ANDAMENTO</span>`) + `<span class="formataTitulos">EM ANDAMENTO</span>`.length;

    const concursos_tag = site.slice(initial_tag, final_tag);
    const $ = cheerio.load(concursos_tag)

    const cards = $('span[class="formataCampos"] a').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();


    console.log(cards)


    


}

module.exports = { concursoEstado }

if (require.main === module) {
    async function Testando () {
        const haha = await concursoEstado()
        console.log(haha)
    }
    Testando()
}