const axios = require('axios');
const cheerio = require('cheerio');


async function UFMS() {
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    const countries = $('div[class="box-border"]').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    
    const ano = new Date().getFullYear().toString();
    let textoSemestre1 = "";
    let textoSemestre2 = "Aguardando...";
    let textoSemestre3 = "";

    for (let i = 1; i < countries.length && i < 5; i++) {
        const dictCountries = countries[i].texto.split('\n');
        const semestre = countries[i].texto.split(' – ')[1].split(' ')[0];
        const anoSemestre = countries[i].texto.split(' – ')[1].split('\n')[0].split(' ')[3];
        const condicao = dictCountries[2].replace(/\s+/g, ' ').trim();
        for (let i = 0; i < dictCountries.length; i++) {
            if (dictCountries[i].includes('Edital')) {
                textoSemestre3 += dictCountries[i].replace(/\s+/g, ' ').trim() + '\n';
            }
        if (textoSemestre3.length === 0) {
            textoSemestre3 = dictCountries[3].replace(/\s+/g, ' ').trim();
        }   
        }
        const conteudoPublicado = dictCountries[3].replace(/\s+/g, ' ').trim();

        if (anoSemestre === ano) {
            if (semestre.includes("1")) {
                textoSemestre1 = countries[i].texto;
            } else if (semestre.includes("2")) {
                textoSemestre2 = countries[i].texto;
            }
            if ( condicao.includes('EM ANDAMENTO') ) {
                const lol = 'lol'
            }
        }
    }
    return `<p>${textoSemestre2}</p><p>${textoSemestre1}</p>`
}

module.exports = { UFMS };

if (require.main === module) {
    async function test() {
        const result = await UFMS();
        console.log(result);
    }
    test()
}
