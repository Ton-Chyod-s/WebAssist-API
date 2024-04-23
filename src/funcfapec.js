const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();
const mes = new Date().getMonth().toString();
const dia = new Date().getDay().toString();
const hojeData = `${dia}/${mes}/${ano}`

async function fapec() {
    const site = "https://fapec.org/processo-seletivo/";
    let conteudo = "";
    let novaListaConteudo = []
    let listaFormatada = ""

    listaFormatada += "<strong>Site: </strong>" + site + "<br><br>"

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
        for (let i = 0; i < 20; i++) {
            if (listaConteudo[i].includes('Processo Seletivo') & !listaConteudo[i].includes('Processo Seletivo - Abertura')) {
                novaListaConteudo.push(listaConteudo[i])
            }
        }
        for (let i = 0; i < novaListaConteudo.length; i++) {
            const itemSplitada = novaListaConteudo[i].split('-')
            const tamanhoItemSplitada = itemSplitada.length
            const itemSplitadaData = itemSplitada[tamanhoItemSplitada - 1].split(' – ')[1].split(' ')[4]
            
            if (itemSplitadaData != hojeData) {
                listaFormatada += `<s>${itemSplitada[itemSplitada.length - 1]}<br></s>`
            } else {
                listaFormatada += `${itemSplitada[itemSplitada.length - 1]}<br>`
            } 
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
