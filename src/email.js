const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');
const { UFMS } = require('./funcUfms');
const { Exercito } = require('./funcExercito');
const { DIOGrande } = require('.//funcDioGrande');
const { fapec } = require('./funcFapec')
const { seges } = require('./funcSeges')
const { concursoEstado } = require('./funcConcursoEstado')
const { fiems } = require('./funcFiems');

const ano = new Date().getFullYear().toString();

async function run(nome,mail,conteudo=true) {
    let documentoGeradoDOE = await DOE(nome);
    let documentoGeradoUFMS = await UFMS();
    let documentoGeradoExercito = await Exercito();
    let documentoGeradoDIOGrande = await DIOGrande(nome);
    let documentoGeradofapec = await fapec()
    let documentoGeradoSeges = await seges()
    let documentoGeradoConcursoEstado = await concursoEstado()
    let documentoGeradoFiems = await fiems()

    const corpoEmail = `<p>Prezado(a),</p>
    <p>Aqui estão as análises solicitadas:</p>
    ${conteudo ? `
    <p><strong>Movimentação Interna e Reingresso UFMS ${ano}</strong></p>
    <p>${documentoGeradoUFMS}</p>
    <p><strong>Oficial Técnico Temporário (OTT) - PROCESSO SELETIVO ${ano}</strong></p>
    <p>${documentoGeradoExercito}</p>
    ` : ''}
    <p><strong>Diário Oficial do Estado de Mato Grosso do Sul (DOE)</strong></p>
    <p>${documentoGeradoDOE}</p>
    <p><strong>Diário Oficial de Campo Grande – MS (DIOGRANDE Digital)</strong></p>
    <p>${documentoGeradoDIOGrande}</p>
    <h3>Ofertas de concursos</h3>
    <h4>FAPEC</h4>
    <p>${documentoGeradofapec}</p>
    <h4>SEGES</h4>
    <p>${documentoGeradoSeges}</p>
    <h4>CONCURSOS PÚBLICOS E PROCESSOS SELETIVOS - ESTADO</h4>
    <p>${documentoGeradoConcursoEstado}</p>
    <h3>FIEMS</h3>
    <p>${documentoGeradoFiems}</p>
    <p></p>
    <h3>Ofertas de estágio</h3>
    
    <p><i>Por favor, mantenha-se informado sobre possíveis atualizações.<br>
    Atenciosamente,</i></p>
    <p><i>PerinDevBoot~</i></p>`

    let headCorpo = (() => {
         if (conteudo) {
             return `Atualizações - UFMS, OTT, DOE, DIOGrande MS ${ano}`;
         } else {
             return `Atualizações - DOE, DIOGRANDE MS ${ano}`;
         }
     })();

    await main(corpoEmail, `E-mail enviado com sucesso!!`, headCorpo, mail, true);

    documentoGeradoDOE = null;
    documentoGeradoUFMS = null;
    documentoGeradoExercito = null;
    documentoGeradoDIOGrande = null;
    documentoGeradofapec = null;
    documentoGeradoSeges = null;
}

module.exports = { run }

if (require.main === module) {
    run("Klayton Chrysthian Oliveira Dias", "hix_x@hotmail.com");
    run("Silvianny Aparecida Faria Camilo", "silvianny.faria@ufms.br", false);
}