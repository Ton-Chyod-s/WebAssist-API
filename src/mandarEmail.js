const nodemailer = require("nodemailer");

// se for true, o teste será feito, se for false, entrera em produção
const on =  true;

let arg = ".env";
if ( on === true ) {
    arg = ".env.testing"
}

require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? arg : ".env"
  })

const name = process.env.USER;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: name,
        pass: pass,
      },
    });

async function main(texto,imprimirConsole,assunto,para) {
    await transporter.sendMail({
        from: name,
        to: para,
        subject: assunto,
        html: texto
    });
    console.log(imprimirConsole)
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        await main("Teste de envio de e-mail","E-mail enviado com sucesso!!","Teste","hix_x@hotmail.com");
    })();
}