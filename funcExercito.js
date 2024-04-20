
const axios = require('axios');
const cheerio = require('cheerio');
const { main } = require('./mandarEmail');
let texto = "Aguardando..."

async function scrap() {
    const response = await axios.get("https://9rm.eb.mil.br/index.php/oficial-tecnico-temporario");
    const $ = cheerio.load(response.data);
    const countries = $('p').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    for (let i = 0; i < countries.length; i++) {
        const anoAtual = new Date().getFullYear().toString();
        const paragrafo = countries[i]['texto']
        if (paragrafo.includes(anoAtual)) {
            texto = `De uma olhada\n\n${paragrafo}`
        }
    }
    main(`${texto}`,"E-mail enviado com sucesso!!","OTT 9º Região Militar","hix_x@hotmail.com");
}

scrap();
