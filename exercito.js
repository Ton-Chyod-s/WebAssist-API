const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

let texto = "Aguardando..."

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "perindevboot@gmail.com",
        pass: "gxkqsyymnogquthd",
      },
    });

async function main(texto) {
    await transporter.sendMail({
        from: "perindevboot@gmail.com",
        to: "hix_x@hotmail.com",
        subject: "OTT 9º Região Militar",
        text: texto
    });
    console.log('Email enviado!!')
}

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
    main(texto)
}

scrap();
