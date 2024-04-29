const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();
const mes = '0' + (new Date().getMonth() + 1).toString();
const dia = new Date().getDate().toString();
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
        for (let i = 0; i < 60; i++) {
            if (listaConteudo[i].includes('Processo Seletivo') & !listaConteudo[i].includes('Processo Seletivo - Abertura')) {
                novaListaConteudo.push(listaConteudo[i])
            }
        }
        for (let i = 0; i < novaListaConteudo.length; i++) {
            const itemSplitada = novaListaConteudo[i].split('-')
            const tamanhoItemSplitada = itemSplitada.length
            const itemSplitadaData = itemSplitada[tamanhoItemSplitada - 1]
            
            if (itemSplitadaData.includes(hojeData)) {
                listaFormatada += `${itemSplitada[itemSplitada.length - 1]}${itemSplitada[tamanhoItemSplitada - 2]}<br>`
            } else {
                listaFormatada += `<s>${itemSplitada[itemSplitada.length - 1]}<br></s>`
                
            } 
        }
        
        return listaFormatada
    }

module.exports = { fapec }

if (require.main === module) {
    async function Testando () {
        const haha = await fapec()
        console.log(haha)
    }
    Testando()
}