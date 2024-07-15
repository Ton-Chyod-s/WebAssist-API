const nodemailer = require("nodemailer");

require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? ".env" : ".env"
  })

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

async function main(texto,imprimirConsole,assunto,para) {
    await transporter.sendMail({
        from: process.env.USER,
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