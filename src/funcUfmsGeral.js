const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

let dictUfmsNoticias = new Object();
let dictUfmsEditais = new Object();

const mes = new Date().getMonth() + 1;
const meses = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
}


async function funcUfmsGeral() {
    const response = await axios.get('https://ingresso.ufms.br/');
    const html = response.data;

    const $ = cheerio.load(html);

    const cards = $('ul[class="noticias col-md-12"] li a').map((i, item) => ({
        value: $(item).text().replace(/\s\s+/g, ' '),
        link: $(item).attr('href')
    })).get();

    const cardsDate = $('ul[class="noticias col-md-12"] li a span').map((i, item) => ({
        value: $(item).text().replace(/\s\s+/g, ' '),
    })).get();


    for (let i in cards) {
        const data = cardsDate[i].value.trim();
        for ( let j in cards[i]) {
            const element = cards[i][j];
            const mesAtual = meses[mes].toLowerCase();
            if ( element.includes(mesAtual)) {
                dictUfmsEditais[`conteudo `] = element.trim();
                dictUfmsEditais[`link `] = cards[i].link
                break;
            }
        }
        if ( Object.keys(dictUfmsEditais).length != 0)
            dictUfmsNoticias[`Noticias - ${data} - ${i}`] = dictUfmsEditais
            dictUfmsEditais = {}
    }
    
    return dictUfmsNoticias;
}

module.exports = { funcUfmsGeral };

if (require.main === module) {
    func(funcUfmsGeral());
}
