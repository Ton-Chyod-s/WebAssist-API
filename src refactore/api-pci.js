const axios = require('axios');
const cheerio = require('cheerio');

let dictPCI = new Object();

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
    'SP': 'SÃO PAULO'
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

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function exam_region(source_code, uf) {
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
        const cards = $(prop).map((i, item) => ({
            value: $(item).text()
        })).get();
        return cards
    }

    const cardsTitulo = cardsConcurso(`div[class="cb"] img`, 'title');
    const cardsSite = cardsConcurso(`div[class="ca"] a`, 'href');
    const cardsData = cardsConcursoText(`div[class="ce"] span`);



    

    console.log(cardsTitulo)
    console.log(cardsSite)
    console.log(cardsData)

    for ( let i in cardsConcurso) {
        const elements = cardsConcurso[i].texto;

        const lol = 'lol'
        
        
    }






    wait(1000)

}

LINK = "https://www.pciconcursos.com.br/concursos/"

exam_region(LINK, 'ms')
