const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();

async function fapec() {
    let conteudo = "";
    let novaListaConteudo = []
    const response = await axios.get("https://fapec.org/processo-seletivo/");
        const $ = cheerio.load(response.data);
        const cards = $('div[class="card"]').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();
        // Loop through each selected element
        cards.forEach(card => {
            conteudo += card.texto + '\n';
        });
        const listaConteudo = conteudo.split("\n")
        for (let i = 0; i < 200; i++) {
            if (listaConteudo[i].includes('Processo Seletivo') & !listaConteudo[i].includes('Processo Seletivo - Abertura')) {
                novaListaConteudo.unshift(listaConteudo[i])
            }
        }
        return novaListaConteudo.unshift()
    }

module.exports = { fapec }