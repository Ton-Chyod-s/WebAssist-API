const axios = require('axios');
const cheerio = require('cheerio');

json = new Object();
analysis = new Object();

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function exam_region(source_code, region) {
    let initial_tag;
    let marcacao;

    region = region.toUpperCase()

    if ( region === 'NACIONAL' ) {
        marcacao = 'h2';
    } else {
        marcacao = `div class="uf"`;
    }

    function estadoProcura(estado) {
        // initial_tag = $(`div[id="${estado}"]`)

        // for (let i = 0; i < initial_tag.length; i++) {
        //     console.log(initial_tag[i].children[0].children[0].data)
        // }

        // initial_tag = $(`div[class="ca"]`)
       
        const region = ['NACIONAL', 'REGIÃO NORTE', 'REGIÃO NORDESTE', 'REGIÃO CENTRO-OESTE', 'REGIÃO SUDESTE', 'REGIÃO SUL']

        const UFS = {
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

        initial_tag = source_code.indexOf(`<${marcacao}>${region}</${marcacao}>`) + `<${marcacao}>${region}</${marcacao}>`.length;
        final_tag = source_code.indexOf(`<${marcacao}>RIO DE JANEIRO</${marcacao}>`) + `<${marcacao}>RIO DE JANEIRO</${marcacao}>`.length;
    }

    
    const response = await axios.get(source_code);
    const $ = cheerio.load(response.data);
    wait(1000)

    estadoProcura(region)
    




}

LINK = "https://www.pciconcursos.com.br/concursos/"



exam_region(LINK, 'sp')