const { main } = require('./mandarEmail');
const { concursoEstado } = require('./funcConcursoEstado')
const { funcPCI } = require('./funcPCI')

const ano = new Date().getFullYear().toString();

async function run(mail,conteudo=true) {
    let documentoGeradoConcursoEstado = await funcPCI()
  
    const corpoEmail = `<p>Prezado(a),</p>
    <p>Aqui estão as análises solicitadas:</p>
    ${conteudo ? `
    ` : ''}
    <p><strong>Estado</strong></p>
    <p>${documentoGeradoConcursoEstado}</p>
    
    
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

}

module.exports = { run }

if (require.main === module) {
    run("hix_x@hotmail.com",false);
}