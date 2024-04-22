const axios = require('axios');
const cheerio = require('cheerio');

lol ='lol'
const response = await axios.get("https://fapec.org/processo-seletivo/");
    const $ = cheerio.load(response.data);
    const countries = $('.title').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();