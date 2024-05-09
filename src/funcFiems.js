const axios = require('axios');
const cheerio = require('cheerio');

const ano = new Date().getFullYear().toString();

async function fiems() {
    try {
        const response = await axios.get('https://www.fiems.com.br/trabalhe-conosco');
        const $ = cheerio.load(response.data);
        const jobDetails = $('.classe-do-elemento').map((i, item) => ({
          texto: $(item).text().trim()
        })).get();
    
        console.log(jobDetails);
      } catch (error) {
        return 'Ocorreu um erro ao fazer a solicitação:', error;
      }
}

module.exports = { fiems };

if (require.main === module) {
    async function Testando () {
        const haha = await fiems()
        console.log(haha)
    }
    Testando()
}