const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

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
        subject: "Mov Interna UFMS",
        text: texto
    });
    console.log('Email sobre a movimentação interna foi enviado!!')
}

async function scrap() {
    const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
    const $ = cheerio.load(response.data);
    const countries = $('.title').map((i, item) => ({
        texto: $(item).text().trim()
    })).get();
    
    const ano = new Date().getFullYear().toString();
    let textoSemestre1 = "";
    let textoSemestre2 = "Aguardando...";

    for (let i = 0; i < countries.length && i < 5; i++) {
        const semestre = countries[i].texto.split(' – ')[1].split(' ')[0];
        const anoSemestre = countries[i].texto.split(' – ')[1].split(' ')[3];
        
        if (anoSemestre === ano) {
            if (semestre.includes("1")) {
                textoSemestre1 = countries[i].texto;
            } else if (semestre.includes("2")) {
                textoSemestre2 = countries[i].texto;
            }
        }
    }
    // Envie o e-mail aqui, depois de processar todas as informações.
    main(`${textoSemestre2}\n\n${textoSemestre1}`);
}

scrap();