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
        marcacao = 'h2'
    } else {
        marcacao = 'div'
    }

    function estadoProcura(estado) {
        // initial_tag = $(`div[id="${estado}"]`)

        // for (let i = 0; i < initial_tag.length; i++) {
        //     console.log(initial_tag[i].children[0].children[0].data)
        // }

        // initial_tag = $(`div[class="ca"]`)

        initial_tag = source_code.indexOf('<h2>NACIONAL</h2>') + '<h2>NACIONAL</h2>'.length;
        final_tag = source_code.indexOf('<h2>REGIÃO SUDESTE</h2>') + '<h2>REGIÃO SUDESTE</h2>'.length;
    }

    
    const response = await axios.get(source_code);
    const $ = cheerio.load(response.data);
    wait(1000)

    estadoProcura(region)
    



}

LINK = "https://www.pciconcursos.com.br/concursos/"



exam_region(LINK, 'sp')