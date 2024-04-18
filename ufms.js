const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

var datetime = new Date();
const countries = [];

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "perindevboot@gmail.com",
        pass: "gxkqsyymnogquthd",
      },
    });

async function main(texto) {
    const info = await transporter.sendMail({
        from: "perindevboot@gmail.com",
        to: "hix_x@hotmail.com",
        subject: "Mov Interna UFMS",
        text: texto
    });
    console.log('Email enviado!')
}

async function scrap(){
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    $('.title').each(
        (i, item) => countries.push({texto: $(item).text().trim()
        })
    );
    
    ano = datetime.toISOString().slice(0,10).split('-')[0]
    for (let i = 0; i < countries.length; i++) {
        if (i < 5) {
        Semestre = countries[i]['texto'].split(' – ')[1]
        countSemestre = countries[i]['texto'].split(' – ')[1].split(' ').length
        if (countSemestre = 4) {
            semestre = Semestre.split(' ')[0]
            anoSemestre = Semestre.split(' ')[countSemestre - 1]
            if (anoSemestre == ano) {
                textoSemestre = countries[i]['texto']
                main(textoSemestre)
            }
        }
        }
    }
}

scrap();
