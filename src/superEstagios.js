const cheerio = require('cheerio');
const axios = require('axios');

const LINK="https://www.superestagios.com.br/index/processoSeletivo/processo.php?v=MTky"

async function superEstagios() {
    const response = await axios.get(LINK);
}

module.exports = { superEstagios }

if (require.main === module) {
    (async () => {
        await superEstagios();
    })();
}