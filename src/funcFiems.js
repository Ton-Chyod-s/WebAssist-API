const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');



const meses = {1: "Janeiro", 2: "Fevereiro", 3: "Março", 4: "Abril", 5: "Maio", 6: "Junho",
  7: "Julho", 8: "Agosto", 9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro"
};

const mes = meses[new Date().getMonth() + 1];
let dia = new Date().getDate().toString();

if (dia.length === 1) {
    dia = '0' + dia
}

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fiems() {
    let dictFapec = {};
    let dictFapecConteudo = {};
    const site = "https://www.fiems.com.br/trabalhe-conosco";   
    

    const response = await axios.get(site, { httpsAgent });
    const $ = cheerio.load(response.data);
    const cards = $('div[class="col-md-4"]').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();

    for (let i = 0; i < cards.length; i++) {
        const conteudo = cards[i].texto.trim().split('\n').map(line => line.trim());
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
                const dataPubli = $Href('div[class="title"]').map((i, item) => ({
                    texto: $(item).text().trim()
                })).get()[0];

                const dataPubliTXT = dataPubli.texto;
                const dataSplit = dataPubliTXT.split(' ')[4];

                if (dataPubliTXT.includes(dia) || dataSplit > dia && dataPubliTXT.includes(mes)) {
                    
                    dictFapecConteudo['cargo'] = conteudo[0]
                    dictFapecConteudo['dataPubli'] = dataPubliTXT
                    dictFapec[concurso] = dictFapecConteudo
                    dictFapecConteudo = {};
                }
            }
        }
    }

    dictFapec['site'] = site
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
