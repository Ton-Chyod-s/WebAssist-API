const axios = require('axios');
const cheerio = require('cheerio');

json = new Object();
analysis = new Object();

const BRASIL = ['NACIONAL', 'REGIÃO NORTE', 'REGIÃO NORDESTE', 'REGIÃO CENTRO-OESTE', 'REGIÃO SUDESTE', 'REGIÃO SUL']

const ESTADOS = {
    'CE': 'CEARÁ',
    'AC': 'ACRE',
    'AL': 'ALAGOAS',
    'AP': 'AMAPÁ',
    'AM': 'AMAZONAS',
    'BA': 'BAHIA',
    'CE': 'CEARÁ',
    'DF': 'DISTRITO FEDERAL',
    'ES': 'ESPÍRITO SANTO',
    'GO': 'GOIÁS',
    'MA': 'MARANHÃO',
    'MT': 'MATO GROSSO',
    'MS': 'MATO GROSSO DO SUL',
    'MG': 'MINAS GERAIS',
    'PA': 'PARÁ',
    'PB': 'PARAÍBA',
    'PR': 'PARANÁ',
    'PE': 'PERNAMBUCO',
    'PI': 'PIAUÍ',
    'RJ': 'RIO DE JANEIRO',
    'RN': 'RIO GRANDE DO NORTE',
    'RS': 'RIO GRANDE DO SUL',
    'RO': 'RONDÔNIA',
    'SE': 'SERGIPE',
    'SP': 'SÃO PAULO',
    'SC': 'SANTA CATARINA'
}

const UFS_SITE = {
    'NACIONAL': 'REGIÃO SUDESTE',
    'CEARÁ': 'MARANHÃO',
    'SÃO PAULO': 'RIO DE JANEIRO',
    'RIO DE JANEIRO': 'MINAS GERAIS',
    'MINAS GERAIS': 'ESPÍRITO',
    'ESPÍRITO SANTO': 'REGIÃO SUL',
    'PARANÁ': 'RIO GRANDE DO SUL',
    'SANTA CATARINA': 'REGIÃO CENTRO-OESTE',
    'DISTRITO FEDERAL': 'GOIÁS',
    'GOIÁS': 'MATO GROSSO DO SUL',
    'MATO GROSSO DO SUL': 'MATO GROSSO',
    'MATO GROSSO': 'REGIÃO NORTE',
    'AMAZONAS': 'ACRE',
    'ACRE': 'PARÁ',
    'PARÁ': 'RONDÔNIA',
    'RONDÔNIA': 'TOCANTINS',
    'TOCANTINS': 'REGIÃO NORDESTE',
    'ALAGOAS': 'BAHIA',
    'BAHIA': 'CEARÁ',
    'MARANHÃO': 'PARAÍBA',
    'PARAÍBA': 'PERNAMBUCO',
    'PERNAMBUCO': 'PIAUÍ',
    'PIAUÍ': 'RIO GRANDE DO NORTE',
    'RIO GRANDE DO NORTE': 'SERGIPE',
    'SERGIPE': 'VISITE PERIODICAMENTE - ATUALIZAÇÃO DIÁRIA!!!'
}

async function exam_region(source_code, uf) {
    let dictPCI = new Object();
    dictPCI['link'] = source_code;
    
    uf = uf.toUpperCase()

    let city;
    let Country;
    let propCity;
    let propCity1;
    let propCountry;
    
    (function() { if ( ESTADOS.hasOwnProperty(uf) ) {
        for ( let i in ESTADOS ) {
            if (i === uf ) {
                city = ESTADOS[i]
                break;
                }
            }
        }
    Country = UFS_SITE[city]  
    })();
    
    (function() { if (BRASIL.hasOwnProperty(city)) {
        propCity = `h2`;
        propCity1 = `h2`;
        } else {
            propCity = `div class="uf"`;
            propCity1 = `div`;
        }
    })();

    (function() { if (BRASIL.hasOwnProperty(Country)) {
        propCountry = `h2`;
        propCountry1 = `h2`; 
        } else {
            propCountry = `div class="uf"`;
            propCountry1 = `div`;
        }
    })();
    
    const response = await axios.get(source_code);
    const site = response.data

    initial_tag = site.indexOf(`<${propCity}>${city}</${propCity1}>`) + `<${propCity}>${city}</${propCity1}>`.length;
    
    final_tag = site.indexOf(`<${propCountry}>${Country}</${propCountry1}>`) + `<${propCountry}>${Country}</${propCountry1}>`.length;

    const concursos_tag = site.slice(initial_tag, final_tag);
    const $ = cheerio.load(concursos_tag);


    function cardsConcurso(prop, attr) {
        const cards = $(prop).map((i, item) => ({
            value: $(item).attr(attr)
        })).get();
        return cards
    }

    function cardsConcursoText(prop) {
        let dictData = [];
        let data = '';
        const cards = $(prop).map((i, item) => ({
            value: $(item).text()
        })).get();
        for (let i = 0; i < cards.length; i++) {
            data += cards[i].value
            dictData.push(data);
            data = '';
        }
        return dictData
    }

    function cardsConcursoText1(prop) {
        let dictVagas = [];
        let textCards = '';

        const cards = $(prop);
        for (let i = 0; i < cards.length; i++) {
            let info1 = cards[i].children;
            for (let i = 0; i < info1.length; i++) {
                if ( info1[i].data !== undefined ) {
                    textCards += info1[i].data + ' '
                }
                if ( i === 2 ) {
                    let info2 = info1[i].children[0].data;
                    textCards += info2
                    break;
                }
                
            }
            dictVagas.push(textCards);
            textCards = '';
        }
        
        return dictVagas
    }

    const cardsTitulo = cardsConcurso(`div[class="cb"] img`, 'title');
    const cardsSite = cardsConcurso(`div[class="ca"] a`, 'href');
    const cardsData = cardsConcursoText(`div[class="ce"] span`);
    const cardsVagas = cardsConcursoText1(`div[class="cd"]`);
 
    for (let i = 0; i < cardsTitulo.length; i++) {
        dictPCI[cardsTitulo[i].value] = {
            'site': cardsSite[i].value,
            'data': cardsData[i],
            'vagas': cardsVagas[i]
        }
    }
    return dictPCI 
}

LINK = "https://www.pciconcursos.com.br/concursos/"

module.exports = { exam_region };

if (require.main === module) {
    async function Testando () {
        const haha = await exam_region(LINK, 'ms')
        console.log(haha)
    }
    Testando()
}