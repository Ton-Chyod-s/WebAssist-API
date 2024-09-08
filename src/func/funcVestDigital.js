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
    let $Status;

    async function status(ano) {
        try {
            const responseStatus = await axios.get(ano[0].link);
            $Status = cheerio.load(responseStatus.data);
            const cardsStatus = $Status('span.label.label-warning').map((i, item) => ({
                texto: $Status(item).text(),
            })).get();
    
            return cardsStatus.map(card => card.texto);
        } catch (error) {
            console.error('Error fetching status:', error);
            return [];
        }
    }

    let situacao;
    let cardsConteudo;

    async function conteudo(ano) {
        situacao = await status(ano)
        if (situacao.includes('EM ANDAMENTO')) {
            cardsConteudo = $Status('div[class="col-md-12"]').map(
                (i, item) => ({
                    texto: $Status(item).text().replace(/\t/g, '').replace(/\n/g, ''),
                    link: $Status(item).find('a').attr('href')
                })).get()

        } else {
            cardsConteudo = {
                "Atenção": "Chamada de candidatos para matrícula - Concluida."
            }
        }

        return cardsConteudo;
    }

    if ( cardAnoPosterior.length > 0 ) {
        (async function () {
            const cardsConteudo = await conteudo(cardAnoPosterior);
            console.log(cardsConteudo)

            
        })();
        

    } else {
        (async function () {
            const cardsConteudo = await conteudo(cardAnoAtual);
            console.log(cardsConteudo)

            
        })();

    }

}


if (require.main === module) {
    vestDigital();
}