const axios = require('axios');
const cheerio = require('cheerio');

const funcPCI = async () => {
    const siteUrl = 'https://www.pci.org/';
    const { data } = await axios.get(siteUrl);
    const $ = cheerio.load(data);
    const title = $('title').text();
    return title;
}

module.exports = { funcPCI };

if (require.main === module) {
    async function test() {
        const result = await funcPCI();
        console.log(result);
    }
}

