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
            if (listaConteudo[i].includes('Processo Seletivo Simplificado') || listaConteudo[i].includes('CONCURSO PÚBLICO DE PROVAS')) {
                novaListaConteudo.push(listaConteudo[i])
            }
        }
        for (let i = 0; i < novaListaConteudo.length; i++) {
            const itemSplitada = novaListaConteudo[i].split('-')
            const tamanhoItemSplitada = itemSplitada.length
            const itemSplitadaData = itemSplitada[tamanhoItemSplitada - 1]
            const itemSplitadaCompData = itemSplitada[tamanhoItemSplitada - 1].split(' ')
            let itemDataAbertura = 0
            let itemDataFechamento = 0

            for (let i = 0; i < itemSplitadaCompData.length; i++) {
                const element = itemSplitadaCompData[i];
                if (element.includes('/')) {
                    if (itemDataAbertura === 0) {
                        itemDataAbertura = element
                    } else {
                        itemDataFechamento = element
                    }
                }
                
            }

            if (itemSplitadaData.includes(hojeData) && hojeData >= itemDataAbertura || hojeData <= itemDataFechamento) {
                listaFormatada += `${itemSplitada[itemSplitada.length - 1]}${itemSplitada[tamanhoItemSplitada - 2]}<br><br>`
            } else {
                if (itemSplitada.length === 3) {
                    listaFormatada += `<s>${itemSplitada[itemSplitada.length - 2]} - ${itemSplitada[itemSplitada.length - 1]}<br><br></s>`
                } else {
                    listaFormatada += `<s>${itemSplitada[itemSplitada.length - 1]}<br><br></s>`
                }
                
                
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
