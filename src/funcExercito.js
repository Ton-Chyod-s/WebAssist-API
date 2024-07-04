
const axios = require('axios');
const cheerio = require('cheerio');

let dictAnalise = {};
let dictCorpo = {};

async function Exercito() {
    try{
        const response = await axios.get("https://9rm.eb.mil.br/index.php/oficial-tecnico-temporario");
        const $ = cheerio.load(response.data);
        const countries = $('p').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();
     
        for (let i = 0; i < countries.length; i++) {
            const anoAtual = new Date().getFullYear().toString();
            
            const paragrafo = countries[i]['texto']
            if (paragrafo.includes(anoAtual)) {

                dictAnalise['Encontrei'] = `Prepare-se e leia atentamente o edital da convocação. Boa sorte, guerreiro!`
                
                const tituloAno = `ott-${anoAtual}`
                const site = `https://9rm.eb.mil.br/index.php/${tituloAno}`

                const responseCorpo = await axios.get(site);
                const $Corpo = cheerio.load(responseCorpo.data);  
                const countriesCorpo = $Corpo('td').map((i, item) => ({
                    texto: $(item).text().trim()
                })).get();

                for (let i = 0; i < countriesCorpo.length; i++) {
                    const conteudoLinha = countriesCorpo[i]['texto']
                    if ( !conteudoLinha.includes(' MB') ) {
                        dictCorpo[i] = conteudoLinha;
                    }
                }

                dictAnalise[paragrafo] = dictCorpo

            }
        }
        return dictAnalise;
    } catch (error) {
        return dictAnalise;
    }
}

module.exports = { Exercito };

if (require.main === module) {
    (async () => {
        console.log(await Exercito());
    })();
}