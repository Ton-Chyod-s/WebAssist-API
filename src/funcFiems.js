const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const ano = new Date().getFullYear().toString();
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const mes = meses[new Date().getMonth()];
const dia = new Date().getDate().toString();
const data = dia + '/' + mes + '/' + ano

// não recomendado em produção por falha de segurança
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fiems() {
    let resposta = "";
    let url = "";
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
                }

            const href = $('a[class="btn btn-primary btn-lg btn-block"]').map((i, item) => ({
                texto: $(item).attr('href') 
            })).get();
            
            for (let i = 0; i < href.length; i++) {
                const cargoComp = cargoDicionario[0].split(' ')[1].replace('/','');
                const apSite = href[i].texto.split('-')[2];
                if (cargoComp === apSite) {
                    url = href[i].texto;
                    break;
                }
            }
            const hrefURL = await axios.get(url, { httpsAgent });
            const $Cheerio = cheerio.load(hrefURL.data);
            const dataPubli = $Cheerio('h3[class="subtitle mt-2"]').map((i, item) => ({
                texto: $(item).text().trim()
              })).get();
              
            const diaPublicado = dataPubli[0].texto.split(' ')[2]
            const mesPublicado = dataPubli[0].texto.split(' ')[4]
            const anoPublicado = dataPubli[0].texto.split(' ')[6]

            if (dataPubli[0].texto.includes(anoPublicado) && mes === mesPublicado) {
                const cargo =  cargoDicionario[0]
                const cidade =  cargoDicionario[1]
                const local = cargoDicionario[2]
                const dataPublicado = dataPubli[0].texto
                
                if (cidade.includes('Campo Grande')) {
                    resposta += `${cargo}<br>${cidade}, ${local}<br>${dataPublicado}<br><br>`
                }
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