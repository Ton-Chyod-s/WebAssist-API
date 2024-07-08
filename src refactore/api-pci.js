const axios = require('axios');
const cheerio = require('cheerio');

json = new Object();
analysis = new Object();

async function exam_region(source_code, region) {
    let initial_tag;

    function estadoProcura(estado) {
        initial_tag = $(`div[id="${estado}"]`).map((i, item) => ({
            texto: $(item).text().split("\n") 
        })).get();

        console.log(initial_tag)
    }

    const UFS = ['nacional','CE','SP','RJ','MG','ES','PR','SC','DF','GO','MS','MT','AM','AC','PA','RO','TO','AL','BA','MA','PA', 'PE','PI','RN','SE'
    ]

    const response = await axios.get(source_code);
    const $ = cheerio.load(response.data);

    estadoProcura(region)
    



}

LINK = "https://www.pciconcursos.com.br/concursos/"



exam_region(LINK, 'MS')