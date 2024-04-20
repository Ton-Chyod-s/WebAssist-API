const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');
const { UFMS } = require('./funcUfms');
const { Exercito } = require('./funcExercito');

const ano = new Date().getFullYear().toString();

async function run() {
    const documentoGeradoDOE = await DOE('Klayton Chrysthian Oliveira Dias');
    const documentoGeradoUFMS = await UFMS();
    const documentoGeradoExercito = await Exercito();

    const corpoEmail = `
    Prezado(a),\n\nAqui estão as análises solicitadas:\n\nMovimentação Interna e Reingresso UFMS ${ano}\n${documentoGeradoUFMS}\n\nOficial Técnico Temporário (OTT) - PROCESSO SELETIVO ${ano}\n${documentoGeradoExercito}\n\n${documentoGeradoDOE}\n\nPor favor, mantenha-se informado sobre possíveis atualizações.\n\nAtenciosamente,\nPerinDevBoot~
    `

    // Envie o e-mail aqui, após o processamento de todas as informações.
    main(corpoEmail, "E-mail enviado com sucesso!!", "Diario Oficial MS", 'hix_x@hotmail.com', true);
}

run();