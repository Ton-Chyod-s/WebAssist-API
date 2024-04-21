const { main } = require('./src/mandarEmail');
const { DOE } = require('./src/funcDoe');
const { UFMS } = require('./src/funcUfms');
const { Exercito } = require('./src/funcExercito');
const { DIOGrande } = require('./draft/DIOGrande');

const ano = new Date().getFullYear().toString();

async function run(nome,mail,conteudo=true) {
    //let documentoGeradoDOE = await DOE(nome);
    //let documentoGeradoUFMS = await UFMS();
    //let documentoGeradoExercito = await Exercito();
    let documentoGeradoDOE = await DIOGrande(nome);

    // const corpoEmail = `<p>Prezado(a),</p>
    // <p>Aqui estão as análises solicitadas:</p>
    // ${conteudo ? `
    // <p><strong>Movimentação Interna e Reingresso UFMS ${ano}</strong></p>
    // <p>${documentoGeradoUFMS}</p>
    // <p><strong>Oficial Técnico Temporário (OTT) - PROCESSO SELETIVO ${ano}</strong></p>
    // <p>${documentoGeradoExercito}</p>
    // ` : ''}
    // <p><strong>Diário Oficial do Estado de Mato Grosso do Sul (DOE)</strong></p>
    // <p>${documentoGeradoDOE}</p>
    // <p><i>Por favor, mantenha-se informado sobre possíveis atualizações.<br>
    // Atenciosamente,</i></p>
    // <p><i>PerinDevBoot~</i></p>`

    // let headCorpo = (() => {
    //     if (conteudo) {
    //         return `Atualizações - UFMS, OTT e DOE ${ano}`;
    //     } else {
    //         return `Atualizações - DOE ${ano}`;
    //     }
    // })();

    // // Envie o e-mail aqui, após o processamento de todas as informações.
    // await main(corpoEmail, `E-mail enviado com sucesso!!`, headCorpo, mail, true);

    // // Limpar ou redefinir as variáveis utilizadas
    // documentoGeradoDOE = null;
    // documentoGeradoUFMS = null;
    // documentoGeradoExercito = null;
}

run("Klayton Chrysthian Oliveira Dias", "hix_x@hotmail.com");
//run("Silvianny Aparecida Faria Camilo", "silvianny.faria@ufms.br", false);
