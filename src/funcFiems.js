const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const ano = new Date().getFullYear().toString();
// não recomendado em produção por falha de segurança
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fiems() {
    let resposta = "";
    const url = "";
    try {
        const response = await axios.get('https://www.fiems.com.br/trabalhe-conosco', { httpsAgent });
        const $ = cheerio.load(response.data);
        const jobDetails = $('div[class="col-md-4"]').map((i, item) => ({
          texto: $(item).text().trim()
        })).get();
        
        for (let i = 0; i < jobDetails.length; i++) {
            const dicionario = jobDetails[i].texto.split('\n');
            let cargoDicionario = new Array();
            for (let i = 0; i < dicionario.length; i++) {
                cargoDicionario.push(dicionario[i].trim())

                const lol = $('a[class="btn btn-primary btn-lg btn-block"]').map((i, item) => ({
                    texto: $(item).attr('href') 
                })).get();
                
                for (let i = 0; i < lol.length; i++) {
                    const cargoComp = cargoDicionario[0].split(' ')[1].replace('/','');
                    const apSite = lol[i].texto.split('-')[2];
                    if (cargoComp === apSite) {
                        cargoDicionario.push(lol[i].texto)
                        break;
                    }

                }
            }
            
            const cargo =  cargoDicionario[0]
            const cidade =  cargoDicionario[1]
            const local = cargoDicionario[2]
            
            





            if (cidade.includes('Campo Grande')) {
                resposta += `${cargo}<br>${cidade}<br>${local}<br><br>`
            }
        }   
        return resposta
      } catch (error) {
        return 'Ocorreu um erro ao fazer a solicitação:', error;
      }
}

module.exports = { fiems };

if (require.main === module) {
    async function Testando () {
        const haha = await fiems()
        console.log(haha)
    }
    Testando()
}