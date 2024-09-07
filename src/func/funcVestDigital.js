const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

const anoAtual = new Date().getFullYear();
const anoPosterior = anoAtual + 1;

async function vestDigital() {
    const site = "https://ingresso.ufms.br/processo/vestibular-ufms-digital/"
    let response;

    response = await axios.get(site);
    const $ = cheerio.load(response.data)
    const cards = $('div[class="btn-group"]').map(
        (i, item) => ({
            texto: $(item).text().trim().replace(/\t/g, '').replace(/\n/g, ''),
            link: $(item).find('a').attr('href')
        })).get()

    function cardAnoAnalisado (ano) {
        const cardsAno = cards.filter((item) => item.texto.includes(ano)).map((item) => ({
            texto: item.texto,
            link: item.link
        }));
        return cardsAno;
    }

    const cardAnoAtual = cardAnoAnalisado(anoAtual);
    const cardAnoPosterior = cardAnoAnalisado(anoPosterior);

    // elaborar a logica para verificar se há informações para o ano posterior
    if ( cardAnoPosterior.length != 0 ) {
        console.log('Não há informações para o ano posterior.')
    } else {
        console.log(cardAnoAtual)
    }



    console.log(cards)


    // verificar o conteudo do site
    // let cards = $('div[class="col-md-12"]').map(
    //     (i, item) => ({
    //         texto: $(item).text().trim().replace(/\t/g, '').replace(/\n/g, ''),
    //         link: $(item).find('a').attr('href')
    //     })).get()

   

}



if (require.main === module) {
    vestDigital();
}