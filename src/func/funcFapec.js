const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

const ano = new Date().getFullYear();
const mes = (new Date().getMonth() + 1).toString().padStart(2, '0');
const dia = new Date().getDate().toString().padStart(2, '0');
const hojeData = `${dia}/${mes}/${ano}`;

let dictFapec = {};

async function fapec() {
    const site = "https://fapec.org/processo-seletivo/";
    dictFapec['site'] = site;
    let response;

    try {
        response = await axios.get(site);
    } catch (error) {
        dictFapec['Erro!'] = { 'cargo-data': 'Erro ao acessar o site' };
        return dictFapec;
    }

    const $ = cheerio.load(response.data);
    const cards = $('button[data-toggle="collapse"]').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();

    cards.forEach(card => {
        const element = card.texto;

        if (element === '') return;

        const elementSplit = element.split(' – ').join('-').split('-');

        if (elementSplit.length >= 3) {
            const dataConcurso = elementSplit[0];
            const [diaConcurso, mesConcurso, anoConcurso] = dataConcurso.split('/').map(Number);

            if (anoConcurso === ano && mesConcurso === Number(mes) && diaConcurso >= Number(dia)) {
                dictFapec[`${elementSplit[0]}`] = {
                    cargo: elementSplit[1] || 'N/A',
                    tempo: elementSplit[2] || 'N/A'
                };
            }
        }
    });

    if (Object.keys(dictFapec).length === 1 && dictFapec['site']) {
        dictFapec['Erro!'] = { 'unknown': 'Não há concursos abertos' };
    }

    return dictFapec;
}

module.exports = { fapec };

if (require.main === module) {
    func(fapec);
}
