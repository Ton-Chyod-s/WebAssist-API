const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

async function vestDigital() {

    const site = "https://ingresso.ufms.br/processo/vestibular-ufms-digital/"

    let response;

    response = await axios.get(site);
    const $ = cheerio.load(response.data)
    const cards = $().map(
        (i, item) => ({
            texto: $(item).text().trim()
        })).get()

    console.log(cards)
    
}

modeule.exports = { vestDigital };

if (require.main === module) {
    func(vestDigital);
}