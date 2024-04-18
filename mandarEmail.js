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

export { main }