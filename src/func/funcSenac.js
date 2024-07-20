const cheerio = require('cheerio');
const axios = require('axios');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function funcSenac() {

    const LINK_SITE = 'https://ms.senac.br/site/vagas'

    const reponse = await axios.get(LINK_SITE, { httpsAgent });
    const site = reponse.data;

    initial_tag = site.indexOf(`<div class="col-md-12">`) + `<div class="col-md-12">`.length;

    final_tag = site.indexOf(`<div class="col-md-4">`) + `<div class="col-md-4">`.length;


}

module.exports = { funcSenac }

if (require.main === module) {
    funcSenac(funcSenac)
}