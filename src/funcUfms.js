const axios = require('axios');
const cheerio = require('cheerio');


async function UFMS() {
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    const countries = $('.title').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    
    const ano = new Date().getFullYear().toString();
    let textoSemestre1 = "";
    let textoSemestre2 = "Aguardando...";

    for (let i = 0; i < countries.length && i < 5; i++) {
        const semestre = countries[i].texto.split(' – ')[1].split(' ')[0];
        const anoSemestre = countries[i].texto.split(' – ')[1].split(' ')[3];
        
        if (anoSemestre === ano) {
            if (semestre.includes("1")) {
                textoSemestre1 = countries[i].texto;
            } else if (semestre.includes("2")) {
                textoSemestre2 = countries[i].texto;
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
