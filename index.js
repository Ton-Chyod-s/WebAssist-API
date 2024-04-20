const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');
const { UFMS } = require('./funcUfms');

const ano = new Date().getFullYear().toString();

async function run() {
    const documentoGeradoDOE = await DOE('Klayton Chrysthian Oliveira Dias');
    const documentoGeradoUFMS = await UFMS();


    const corpoEmail = `
    <html>
    <body>
        <p>Prezado(a),</p>
        <p>Aqui estão as análises solicitadas:</p>
        <p>Movimentação Interna e Reingresso UFMS ${ano}</p>
        <p>${documentoGeradoUFMS}</p>
        <p>${documentoGeradoDOE}</p>
    </body>
    </html>
    `;

    // Envie o e-mail aqui, após o processamento de todas as informações.
    main(corpoEmail, "E-mail enviado com sucesso!!", "Diario Oficial MS", 'hix_x@hotmail.com', true);
}

run();