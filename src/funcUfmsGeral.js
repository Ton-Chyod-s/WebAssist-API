const axios = require('axios');
const cheerio = require('cheerio');

async function funcUfmsGeral() {
    const response = await axios.get('https://www.ufms.br/');
    const html = response.data;
}

module.exports = funcUfmsGeral;

if (require.main === module) {
    (async () => {
        console.log(await funcUfmsGeral());

    })();
}
