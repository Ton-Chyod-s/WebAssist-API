const axios = require('axios')
const cheerio = require('cheerio')
const axios = require('axios');
const cheerio = require('cheerio');

async function estagio() {
    try {
        const response = await axios.get('https://example.com'); // Replace with the URL you want to scrape
        const $ = cheerio.load(response.data);
        
        // Use cheerio selectors to extract data from the HTML
        // Example:
        const title = $('h1').text();
        
        // Return the extracted data or perform other operations
        return title;
    } catch (error) {
        console.error('Error:', error);
    }
}

if (require.main === module) {
    async function Testando() {
        const test = await estagio();
        console.log(test);
    }
    Testando();
}