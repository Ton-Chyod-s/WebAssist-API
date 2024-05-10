const axios = require('axios');
const cheerio = require('cheerio');

const funcPCI = async () => {
    let concurso = "";
    const siteUrl = 'https://www.pciconcursos.com.br/concursos/centrooeste/';
    const { data } = await axios.get(siteUrl);
    const $ = cheerio.load(data);
    let title = $('div[id="concursos"]').text();
    title = title.split('\n').map(line => line.trim()).filter(line => line !== '');
    for (let i = 0; i < title.length; i++) {
        if (title[i] == 'MS') {
            concurso += `${title[i - 1]} - ${title[i]} - ${title[i + 1]} - ${title[i + 2]}\n`
        }
        
    }
    return concurso;
}

module.exports = { funcPCI };

if (require.main === module) {
    async function test() {
        const result = await funcPCI();
        console.log(result);
    }
    test()
}

