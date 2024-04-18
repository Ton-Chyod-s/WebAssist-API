const axios = require('axios');
const cheerio = require('cheerio');

var datetime = new Date();
const countries = [];

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    $('.title').each(
        (i, item) => countries.push({texto: $(item).text().trim()
        })
    );
    
    ano = datetime.toISOString().slice(0,10).split('-')[0]
    for (let i = 0; i < countries.length; i++) {
        if (i < 5) {
        Semestre = countries[i]['texto'].split(' – ')[1]
        countSemestre = countries[i]['texto'].split(' – ')[1].split(' ').length
        if (countSemestre = 4) {
            semestre = Semestre.split(' ')[0]
            anoSemestre = Semestre.split(' ')[countSemestre - 1]
            if (anoSemestre == ano) {
                textoSemestre = countries[i]['texto']
                console.log(textoSemestre)
            }
        }
        }
    }
}

scrap();
