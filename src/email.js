const { main } = require('./mandarEmail');
const { DOE } = require('./funcDoe');
const { UFMS } = require('./funcUfms');
const { Exercito } = require('./funcExercito');
const { DIOGrande } = require('.//funcDioGrande');
const { fapec } = require('./funcFapec')
const { seges } = require('./funcSeges')
const { concursoEstado } = require('./funcConcursoEstado')
const { fiems } = require('./funcFiems');
const { exam_region } = require('./funcPCI');
const { funcUfmsGeral } = require('./funcUfmsGeral');

const ano = new Date().getFullYear().toString();

async function run(nome,mail,conteudo=true,diario=true) {
    const LINK = "https://www.pciconcursos.com.br/concursos/"

    let listaSeges = '';    
    let listaConcursoEstado = '';
    let listaConcursos = '';
    let listaExercito = '';
    let listaFapec = '';
    let listaFiems = '';
    let listaUFMS = '';
    let listaUFMSGeral = '';
    let listaDioGrande = '';

    let documentoGeradoDOE;
    let documentoGeradoDIOGrande;

    if ( diario === true ) {
        documentoGeradoDOE = await DOE(nome);
        documentoGeradoDIOGrande = await DIOGrande(nome);
        for ( let i in documentoGeradoDIOGrande ) {
            const item = documentoGeradoDIOGrande[i]
            if (typeof(item) !== 'string') {
                const data = item.data
                const link = item.link
                const tipo = item.tipo

                listaDioGrande += `<p>${'test'} ${data} ${tipo} <br>${link}</p>`
                
            } else {
                listaDioGrande += `<p>${item}</p>`
            }
        }
    }

    let documentoGeradofapec = await fapec();
    let documentoGeradoSeges = await seges();
    let documentoGeradoConcursoEstado = await concursoEstado();
    let documentoGeradoFiems = await fiems();
    let documentoGeradoPCI = await exam_region(LINK, 'ms');

    let documentoUfmsGeral = await funcUfmsGeral();
    for ( let i in documentoUfmsGeral ) {
        const item = documentoUfmsGeral[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                listaUFMSGeral += `<p>${item[linha]}</p>`
            }
        } else {
            listaUFMSGeral += `<h4>${item}</h4>`
        }
    }


    for (let i in documentoGeradoSeges) {
        const concurso = i
        const item = documentoGeradoSeges[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                if ( linha !== 'site' ) {
                    listaSeges += `<p>${concurso} - ${item[linha]}</p>`
                } else {
                    listaSeges += `<p>Link: ${item[linha]}</p>`
                }
            }
        } else {
            listaSeges += item
        }
        
    }

    for ( let linha in documentoGeradoConcursoEstado ) {
        const link = documentoGeradoConcursoEstado[linha]['site']
        listaConcursoEstado += `${linha}<p><strong>Link:</strong> ${link}<p><br>`
    }


    for ( let linha in documentoGeradoPCI ) {
        const vagas = documentoGeradoPCI[linha]['vagas']
        const link = documentoGeradoPCI[linha]['site']
        const inscricao = documentoGeradoPCI[linha]['data']
    
        listaConcursos += `${linha}, Vagas: ${vagas}, Inscrição Até: ${inscricao}<p><strong>Link:</strong> ${link}<p><br>`
    }
    
    if ( conteudo === true ) {
        let documentoGeradoUFMS = await UFMS();
        let documentoGeradoExercito = await Exercito();

        for ( let i in documentoGeradoExercito ) {
            const item = documentoGeradoExercito[i]
            
            if (typeof(item) !== 'string') {
                for ( let linha in item ) {
                    listaExercito += `<p>${item[linha]}</p>`
                }
            } else {
                listaExercito += `<h3 id="exercito">${item}</h3>`
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

    const corpoEmail = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>

            body {
                font-family: Arial, sans-serif;
                font-size: 1.1em;
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 5px;
            }

            h3 {
                color: black;
                display: flex;
                justify-content: center;
            }
            
            div #cards {
                background-color: white;
                padding: 0px 5px 5px 10px;
                border-radius: 5px;
                border : 0.5px solid #dbdbdb;
            }

            div #footer {
                font-size: 0.8em;
            }

            div #informativo {
                font-size: 0.7em;
                text-italic: true;
            }

        </style>

    </head>
    <body>

        <p>Prezado(a),</p>
        <p>Aqui estão as análises solicitadas:</p>

        ${conteudo ? `
        <h3><strong>❕ Movimentação Interna e Reingresso UFMS ${ano}</strong></h3>
        <p>
            <div id="cards">
                ${listaUFMS}
            </div>
        </p>

        <h3><strong>❕ Oficial Técnico Temporário (OTT) - PROCESSO SELETIVO ${ano}</strong></h3>
        <p>
            <div id="cards">
                ${listaExercito}
            </div>
        </p>
        ` : ''}

        ${diario ? `

        <h3><strong>❕ Diário Oficial do Estado de Mato Grosso do Sul (DOE)</strong></h3>
        <p>
            <div id="cards">
                ${documentoGeradoDOE}
            </div>
        </p>
        <h3><strong>❕ Diário Oficial de Campo Grande – MS (DIOGRANDE Digital)</strong></h3>
        <p>
            <div id="cards">
                ${listaDioGrande}
            </div>
        </p>
        ` : ''}

        <h3>❕ Noticias UFMS-Ingresso</h3>
        <p>
            <div id="cards">
                ${listaUFMSGeral}
            </div>
        </p>
        <h4>~Ofertas de concursos~</h4>
        <h3>❕ FAPEC</h3>
        <p>
            <div id="cards">
                ${listaFapec}
            </div>
        </p>

        <h3>❕ SEGES</h3>
        <p>
            <div id="cards">
                ${listaSeges}
            </div>
        </p>

        <h3>❕ CONCURSOS PÚBLICOS E PROCESSOS SELETIVOS - ESTADO</h3>
        <p>
            <div id="cards">
                ${listaConcursoEstado}
            </div>
        </p>

        <h3>❕ FIEMS</h3>
        <p>
            <div id="cards">
                ${listaFiems}
            </div>
        </p>

        <h3>❕ PCI Concursos</h3>
        <p>
            <div id="cards">
                ${listaConcursos}
            </div>
        </p>
    
        </section>

    </body>
    <div id="footer">
        <p>Por favor, mantenha-se informado sobre possíveis atualizações.</br></br>
            Atenciosamente, <strong>PerinDevBoot~</strong></br>
        <div id=informativo>Este é um e-mail automático, favor não responder.</div></p>
    </div>
    </html>
    `

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
    documentoGeradoConcursoEstado = null;
    documentoGeradoFiems = null;
    documentoGeradoPCI = null;
}

module.exports = { run }

if (require.main === module) {
    // run("Klayton Chrysthian Oliveira Dias", "hix_x@hotmail.com");
    run("Silvianny Aparecida Faria Camilo", "silvianny.faria@ufms.br", false);
    // run("Ronaldo dos Santos","ronaldo.stst@gmail.com",false)
    // run('Andreza Gabriela Leão Alves','andrezagabrielaalves@gmail.com',false)
    // run('delmar silva dias','sdiascx@hotmail.com', true, false)
}
