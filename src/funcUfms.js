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
        const limpo = countries[i].texto.replace(/\t/g, '').replace(/\n/, '').split('\n');
        const dictCountries2 = limpo.filter((item) => item !== '');
        const semestre = countries[i].texto.split(' – ')[1].split(' ')[0];
        const anoSemestre = countries[i].texto.split(' – ')[1].split('\n')[0].split(' ')[3];
        const condicao = dictCountries2[1];

        for (let i = 0; i < dictCountries2.length; i++) {
            if (dictCountries2[i].includes('Edital')) {
                textoSemestre3 += dictCountries2[i] + '<br><br>';
            }
        }
        if (textoSemestre3.length === 0) {
            textoSemestre3 = dictCountries2[2].trim();
        }   
        
        if (anoSemestre === ano) {
            if (semestre.includes("1")) {
                if (condicao === "CONCLUÍDO") {
                    textoSemestre1 = dictCountries2[0];
                } else {
                    textoSemestre1 = `${dictCountries2[0]}<br><br><i>${textoSemestre3}</i>`  
                }
                
            } else if (semestre.includes("2")) {
                if (condicao === "CONCLUÍDO") {
                    textoSemestre2 = dictCountries2[0];
                } else {
                    textoSemestre2 = `${dictCountries2[0]}<br><br><i>${textoSemestre3}</i>` 
                }
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
