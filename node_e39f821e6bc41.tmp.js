const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "perindevboot@gmail.com",
        pass: "gxkqsyymnogquthd",
      },
    });


async function main() {
    const info = await transporter.sendMail({
        from: "perindevboot@gmail.com",
        to: "arqkdias@gmail.com",
        subject: "Hello ✔",
        text: "teste"
    });
}


main()