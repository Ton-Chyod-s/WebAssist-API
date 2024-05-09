const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const ano = new Date().getFullYear().toString();
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const mes = meses[new Date().getMonth()];
const dia = new Date().getDate().toString();
const data = dia + '/' + mes + '/' + ano;
// não recomendado em produção por falha de segurança
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fiems() {
    let resposta = "";
    let url = "";
    try {
        async function getJobDetails() {
            const response = await axios.get('https://www.fiems.com.br/trabalhe-conosco', { httpsAgent });
            const $ = cheerio.load(response.data);
            return $('div[class="col-md-4"]').map((i, item) => ({
                texto: $(item).text().trim()
            })).get();
        }
        
        async function getHref(url) {
            const response = await axios.get(url, { httpsAgent });
            const $ = cheerio.load(response.data);
            return $('a[class="btn btn-primary btn-lg btn-block"]').map((i, item) => ({
                texto: $(item).attr('href')
            })).get();
        }
        
        async function getJobPublicationDate(url) {
            const response = await axios.get(url, { httpsAgent });
            const $ = cheerio.load(response.data);
            const dataPubli = $('h3[class="subtitle mt-2"]').map((i, item) => ({
                texto: $(item).text().trim()
            })).get();
            return dataPubli[0].texto;
        }
        
        function formatDate(dateString) {
            const parts = dateString.split(' ');
            return {
                day: parts[2],
                month: parts[4],
                year: parts[6]
            };
        }
        
        async function processJobDetails(jobDetails) {
            let resposta = '';
            for (const detail of jobDetails) {
                const dicionario = detail.texto.split('\n').map(line => line.trim());
                const cargo = dicionario[0];
                const cidade = dicionario[1];
                const local = dicionario[2];
                
                if (cidade.includes('Campo Grande')) {
                    const href = await getHref('https://www.fiems.com.br/trabalhe-conosco');
                    for (const link of href) {
                        const cargoComp = cargo.split(' ')[1].replace('/', '');
                        const apSite = link.texto.split('-')[2];
                        if (cargoComp === apSite) {
                            const publicationDate = await getJobPublicationDate(link.texto);
                            const { day, month, year } = formatDate(publicationDate);
                            if (month === mes) {
                                if (day != dia) {
                                    resposta += `<s>${cargo}, ${cidade}, ${local}<br>${publicationDate}</s><br><br>`;
                                } else {
                                    resposta += `${cargo}, ${cidade}, ${local}<br>${publicationDate}<br><br>`;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            return resposta;
        }
        
        const jobDetails = await getJobDetails();
        const resposta = await processJobDetails(jobDetails);
        return resposta;
        
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