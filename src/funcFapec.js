const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();
const mes = '0' + (new Date().getMonth() + 1).toString();
const dia = new Date().getDate().toString();
const hojeData = `${dia}/${mes}/${ano}`

let dictFapec = {};
let dictConteudo = {};

async function fapec() {
    
    const site = "https://fapec.org/processo-seletivo/";
    dictFapec['site'] = site
    let response;
    

    try {
        response = await axios.get(site);
        
    } catch (error) {
        dictConteudo['cargo-data'] = 'Erro ao acessar o site';
        dictFapec['Erro!'] = dictConteudo;
        return dictFapec;
    }
        const $ = cheerio.load(response.data);
        const cards = $('button[data-toggle="collapse"]').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();

        for (let i = 0; i < cards.length; i++) {
            const element = cards[i].texto
            if ( element === '' ) {
                continue;
            }
            const elementSplit = element.split(' ');
            for ( let j in elementSplit ) {
                let diaConcurso;
                let mesConcurso;
                let anoConcurso;
                const newElement = elementSplit[j].replace(/\n/g, '');
                if ( newElement.includes('/') && newElement.length === 10 ) {
                    const dataSplit = newElement.split('/');
                    if ( dataSplit[0] > dia ) {
                        diaConcurso = dataSplit[0];
                        mesConcurso = dataSplit[1];
                        anoConcurso = dataSplit[2];
                        
                    }
                    // verifica se a string contém "Inscrições abertas", data de hoje e se o dia de hoje é o menor que o maior dia do concurso
                    if ( cards[i].texto.includes('Inscrições abertas') && newElement > hojeData ) {
                        const elementSplit = element.split(' – ');
                        let processo;
                        let cargo;
                        let data;

                        if ( elementSplit.length === 2) {
                            const element0Split = elementSplit[1].split('-');

                            processo = elementSplit[0];
                            cargo = element0Split[0];
                            data = element0Split[1];
                        } else {

                            processo = elementSplit[0];
                            cargo = elementSplit[1];
                            data = elementSplit[2];
                        }
                        
                        dictConteudo['cargo'] = cargo;
                        dictConteudo['tempo'] = data;
                        dictFapec[processo] = dictConteudo;
                        dictConteudo = {};
                    } 
                }


                    
                }
            }

            

            

        if ( Object.keys(dictFapec).length === 1 ) {
            dictConteudo['unknown'] = 'Não há concursos abertos';
            dictFapec['Erro!'] = dictConteudo;
        }
        return dictFapec;
    }

module.exports = { fapec }

if (require.main === module) {
    async function Testando () {
        const haha = await fapec()
        console.log(haha)
    }
    Testando()
}
