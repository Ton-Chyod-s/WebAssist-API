const axios = require('axios');
const cheerio = require('cheerio');

async function seges() {
    let resposta = "";
    const response = await axios.get("https://www.campogrande.ms.gov.br/seges/processoseletivo/");
    const $ = cheerio.load(response.data);
    const cards = $('h4').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    const liCards = $('ul').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();    
    for (let i = 0; i < liCards.length; i++) {
        for (const key in liCards[i]) {
            const element = liCards[i][key];
            if (element.includes('Edital Processo Seletivo') && !element.includes('Inscrições encerradas')) {
                const elementObjt = element.split(' – ')
                resposta += `${elementObjt[0]} - ${elementObjt[1]}<br>`
            } 
        }
    }
    if (resposta === "") {
        resposta += `Infelizmente, após minhas buscas, não foram encontradas ofertas.`
    }
    return resposta
}

module.exports = { seges }

if (require.main === module) {
    async function lol () {
        const haha = await seges()
        console.log(haha)
    }
    lol()
}