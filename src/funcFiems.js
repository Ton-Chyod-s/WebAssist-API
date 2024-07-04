const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

let dictFapec = {};
let dictFapecConteudo = {};

const ano = new Date().getFullYear().toString();

const meses = {1: "Janeiro", 2: "Fevereiro", 3: "Março", 4: "Abril", 5: "Maio", 6: "Junho",
  7: "Julho", 8: "Agosto", 9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro"
};

const mes = meses[new Date().getMonth() + 1];
let dia = new Date().getDate().toString();

if (dia.length === 1) {
    dia = '0' + dia
}

/* Agente https para ignorar certificado SSL
não recomendado em produção por falha de segurança */

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fiems() {
 
    const site = "https://www.fiems.com.br/trabalhe-conosco";   
    
    const response = await axios.get(site, { httpsAgent });
    const $ = cheerio.load(response.data);
    const cards = $('div[class="col-md-4"]').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();

    
    for (let i = 0; i < cards.length; i++) {
        const conteudo = cards[i].texto.trim().split('\n').map(line => line.trim());
        const identificacao = conteudo[0].split(' ')[0].toLowerCase()
        const concurso = conteudo[0].split(' ')[1].replace('/', '')
        let href = '';

        const cidade = conteudo[1]
        if ( cidade === 'Campo Grande') {
            
            const cardsHref = $('a[class="btn btn-primary btn-lg btn-block"]').map((i, item) => ({
                texto: $(item).attr('href')
            })).get();

            for (let i = 0; i < cardsHref.length; i++) {
                if ( cardsHref[i].texto.includes(concurso) ) {
                    href += cardsHref[i].texto
                    break;
                }
            } 

            if ( href !== '' ) {
                const responseHref = await axios.get(href, { httpsAgent });
                const $Href = cheerio.load(responseHref.data);
                const dataPubli = $Href('h3[class="subtitle mt-2"]').map((i, item) => ({
                    texto: $(item).text().trim()
                })).get();

                const dataPubliTXT = dataPubli.map(item => item.texto).toString()

                if (dataPubliTXT.includes(dia) && dataPubliTXT.includes(mes)) {
                    dictFapec['site'] = site

                    dictFapecConteudo['cargo'] = conteudo[0]
                    dictFapecConteudo['dataPubli'] = dataPubliTXT

                    dictFapec[concurso] = dictFapecConteudo

                    dictFapecConteudo = {};

                }
            }
        }
    }

    return dictFapec;

}

module.exports = { fiems };

if (require.main === module) {
    async function Testando () {
        const haha = await fiems()
        console.log(haha)
    }
    Testando()
}



/*

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
                            if (day == dia) {
                                resposta += `<s>${cargo}, ${cidade}, ${local}<br>${publicationDate}</s><br><br>`;
                                dictFapecConteudo[cargo] = `${cargo}, ${cidade}, ${local}<br>${publicationDate}`;
                            }
                        }
                        break;
                    }
                }
            }
        }
        return dictFapecConteudo;
    }
    
    const jobDetails = await getJobDetails();
    const resposta = await processJobDetails(jobDetails);
    return resposta;
        

*/