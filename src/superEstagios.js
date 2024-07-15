const cheerio = require('cheerio');
const axios = require('axios');

const LINK="https://www.superestagios.com.br/index/processoSeletivo/processo.php?v=MTky"

let listProcess = new Array();

async function superEstagios() {
    const response = await axios.get(LINK);
    const $ = cheerio.load(response.data);
    const cards = $('li').map((i, card) => {
        const text = $(card).text().trim().replace('- Clique aqui para visualizar', '');
        const link = $(card).find('a').attr('href');
        return {"texto": text, "link": link};
    }).get();

    for (let i = 0; i < cards.length; i++) {
        const element = cards[i].texto;
        if ( !element.includes("O candidato") ) {
            listProcess.push(cards[i]);
        }
    }
    return console.log(listProcess);
}

module.exports = { superEstagios }

if (require.main === module) {
    (async () => {
        await superEstagios();
    })();
}