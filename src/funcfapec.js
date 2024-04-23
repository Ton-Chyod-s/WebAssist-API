const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();

async function fapec() {
    const site = "https://fapec.org/processo-seletivo/";
    let conteudo = "";
    let novaListaConteudo = []
    let listaFormatada = ""

    listaFormatada += site + "<br>"
    
    const response = await axios.get(site);
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
        for (let i = 0; i < novaListaConteudo.length; i++) {
            const itemSplitada = novaListaConteudo[i].split('-')
            listaFormatada += `${itemSplitada[itemSplitada.length - 1]}<br><br>`
            
        }
        
        return listaFormatada
    }

module.exports = { fapec }

if (require.main === module) {
    async function lol () {
        const haha = await fapec()
        console.log(haha)
    }
    lol()
}
