const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');
const { UFMS } = require('./funcUfms');
const { Exercito } = require('./funcExercito');
const { DIOGrande } = require('.//funcDioGrande');
const { fapec } = require('./funcFapec')
const { seges } = require('./funcSeges')
const { concursoEstado } = require('./funcConcursoEstado')
const { fiems } = require('./funcFiems');
const { funcPCI } = require('./funcPCI');


const ano = new Date().getFullYear().toString();

async function run(nome,mail,conteudo=true) {
    let listaConcursos = '';

    let listaExercito = '';

    let listaFapec = '';

    let listaFiems = '';

    let listaUFMS = '';

    let documentoGeradoDOE = await DOE(nome);
    let documentoGeradoUFMS = await UFMS();
    let documentoGeradoExercito = await Exercito();
    let documentoGeradoDIOGrande = await DIOGrande(nome);
    let documentoGeradofapec = await fapec()
    let documentoGeradoSeges = await seges()
    let documentoGeradoConcursoEstado = await concursoEstado()
    let documentoGeradoFiems = await fiems()
    let documentoGeradoPCI = await funcPCI('ms');

    for ( linha in documentoGeradoPCI ) {
        const vagas = documentoGeradoPCI[linha]['Vagas']
        const link = documentoGeradoPCI[linha]['Link']
        const inscricao = documentoGeradoPCI[linha]['Inscrição Até']
        const nivel = documentoGeradoPCI[linha]['Nível']
        const salario = documentoGeradoPCI[linha]['Salário Até']
    
        listaConcursos += `${linha}, Vagas: ${vagas}, Inscrição Até: ${inscricao}, Nível: ${nivel}, Salário Até: ${salario}<p>Link: ${link}<p><br>`
    }
    

    for ( let i in documentoGeradoExercito ) {
        const item = documentoGeradoExercito[i]
        
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                listaExercito += `<p>${item[linha]}</p>`
            }
        } else {
            listaExercito += `<h3>${item}</h3>`
        }
        
    }

    for ( let i  in documentoGeradofapec ) {
        const item = documentoGeradofapec[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                listaFapec += `<p>${item[linha]}</p>`
            }
        } else {
            listaFapec += `<h4>${item}</h4>`
        }
    }

    for ( let i in documentoGeradoFiems ) {
        const item = documentoGeradoFiems[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                listaFiems += `<p>${item[linha]}</p>`
            }
        } else {
            listaFiems += `<h4>${item}</h4>`
        }
    }

    for ( let i in documentoGeradoUFMS ) {
        const item = documentoGeradoUFMS[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                if ( !item[linha].includes('Chamada de candidatos para matrícula - Concluida.') ) {
                    listaUFMS += `<p>${item[linha]}</p>`
                }
            }
        } else {
            listaUFMS += `<h4>${item}</h4>`
        }
    }

    const corpoEmail = `<p>Prezado(a),</p>
    <p>Aqui estão as análises solicitadas:</p>
    ${conteudo ? `
    <p><strong>Movimentação Interna e Reingresso UFMS ${ano}</strong></p>
    <p>${listaUFMS}</p>
    <p><strong>Oficial Técnico Temporário (OTT) - PROCESSO SELETIVO ${ano}</strong></p>
    <p>${listaExercito}</p>
    ` : ''}
    <p><strong>Diário Oficial do Estado de Mato Grosso do Sul (DOE)</strong></p>
    <p>${documentoGeradoDOE}</p>
    <p><strong>Diário Oficial de Campo Grande – MS (DIOGRANDE Digital)</strong></p>
    <p>${documentoGeradoDIOGrande}</p>
    <h3>Ofertas de concursos</h3>
    <h4>FAPEC</h4>
    <p>${listaFapec}</p>
    <h4>SEGES</h4>
    <p>${documentoGeradoSeges}</p>
    <h4>CONCURSOS PÚBLICOS E PROCESSOS SELETIVOS - ESTADO</h4>
    <p>${documentoGeradoConcursoEstado}</p>
    <h3>FIEMS</h3>
    <p>${listaFiems}</p>
    <h3>PCI Concursos</h3>
    <p>${listaConcursos}</p>
   
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
    run("Ronaldo dos Santos","ronaldo.stst@gmail.com",false)
}