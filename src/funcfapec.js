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
        for (let i = 0; i < 70; i++) {
            if (listaConteudo[i].includes('Processo Seletivo') & !listaConteudo[i].includes('Processo Seletivo - Abertura')) {
                novaListaConteudo.push(listaConteudo[i])
            }
        }
        return novaListaConteudo
    }

module.exports = { fapec }

if (require.main === module) {
    async function lol () {
        const haha = await fapec()
        console.log(haha)
    }
    lol()
}
