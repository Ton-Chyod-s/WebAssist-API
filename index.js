const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');


async function run() {
    const documentoGerado = await DOE('Klayton Chrysthian Oliveira Dias');

    const corpoEmail = `
    <html>
    <body>
        <p>Prezado(a),</p>
        <p>Aqui estão as análises solicitadas:</p>
        <p>${documentoGerado}</p>
    </body>
    </html>
    `;

    // Envie o e-mail aqui, após o processamento de todas as informações.
    main(corpoEmail, "E-mail enviado com sucesso!!", "Diario Oficial MS", 'hix_x@hotmail.com', true);
}

run();