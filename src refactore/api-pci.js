const axios = require('axios');
const cheerio = require('cheerio');

let search = 0;
json = new Object();
analysis = new Object();

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
    'RO': 'RONDÔNIA'
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
    'SERGIPE': 'REGIÃO SUDESTE'
}

const BRASIL = ['NACIONAL', 'REGIÃO NORTE', 'REGIÃO NORDESTE', 'REGIÃO CENTRO-OESTE', 'REGIÃO SUDESTE', 'REGIÃO SUL']

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
    let prop_city;
    let prop_Country;
    
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
        prop_city = `h2`;
        } else {
            prop_city = `div class="uf"`;
        }
    })();

    (function() { if (BRASIL.hasOwnProperty(Country)) {
        prop_Country = `h2`;  
        } else {
            prop_Country = `div class="uf"`;
        }
    })();
    
    initial_tag = source_code.indexOf(`<${prop_city}>${city}</${prop_city}>`) + `<${prop_city}>${city}</${prop_city}>`.length;
    
    
    // final_tag = source_code.indexOf(`<${marcacao}>RIO DE JANEIRO</${marcacao}>`) + `<${marcacao}>RIO DE JANEIRO</${marcacao}>`.length;


    const response = await axios.get(source_code);
    const $ = cheerio.load(response.data);
    wait(1000)

    

}

LINK = "https://www.pciconcursos.com.br/concursos/"

exam_region(LINK, 'ms')
