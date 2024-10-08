const { main } = require('./mandarEmail');
const { DOE } = require('./func/funcDoe');
const { UFMS } = require('./func/funcUfms');
const { Exercito } = require('./func/funcExercito');
const { DIOGrande } = require('./func/funcDioGrande');
const { fapec } = require('./func/funcFapec')
const { seges } = require('./func/funcSeges')
const { concursoEstado } = require('./func/funcConcursoEstado')
const { fiems } = require('./func/funcFiems');
const { exam_region } = require('./func/funcPCI');
// const { funcUfmsGeral } = require('./func/funcUfmsGeral');
const { vestDigital } = require('./func/funcVestDigital');
const { func } = require('./func/func');
const { superEstagios } = require('./func/superEstagios.js');

const ano = new Date().getFullYear().toString();

const LINK = "https://www.pciconcursos.com.br/concursos/"

async function run(nome,mail,conteudo=true,estagio=true,diario=true) {
    let listaSeges = '';    
    let listaConcursoEstado = '';
    let listaConcursos = '';
    let listaExercito = '';
    let listaFapec = '';
    let listaFiems = '';
    let listaUFMS = '';
    let listaUFMSGeral = '';
    let listaDioGrande = '';
    let listaDOE = '';
    let listaSuperEstagios = '';

    let documentoGeradoDOE;
    let documentoGeradoDIOGrande;

    if ( diario === true ) {
        documentoGeradoDOE = await DOE(nome);
        for ( let i in documentoGeradoDOE ) {
            const item = documentoGeradoDOE[i]
            if (typeof(item) !== 'string') {
                const data = item.data
                const documento = item.documento

                listaDOE += `<p>${data} - ${documento}</p>`
            } else {
                listaDOE += `<p>${item}</p>`
            }
        }

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
    let documentoGeradoSuperEstagios = await superEstagios();

    for (let lin in documentoGeradoSuperEstagios) {
        const item = documentoGeradoSuperEstagios[lin];
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                const link = documentoGeradoSuperEstagios[lin]['link']
                listaSuperEstagios += `<p>${item[linha]}</p><p><strong>Link:</strong> ${link}</p><br>`
                break;
            }
        } else {
            listaSuperEstagios += `<h4>${item}</h4>`
        }
    }

    let documentoUfmsGeral = await vestDigital();
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
                    listaSeges += `<p><strong>Link:</strong> ${item[linha]}</p>`
                }
            }
        } else {
            listaSeges += `<h4>${item}</h4>`
        }
        
    }

    for (let i in documentoGeradoConcursoEstado ) {
        const item = documentoGeradoConcursoEstado[i]
        if (typeof(item) !== 'string') {
            for ( let linha in item ) {
                const link = documentoGeradoConcursoEstado[i]['site']
                listaConcursoEstado += `${i}<p><strong>Link:</strong> ${link}<p><br>`
            }
        } else {
            listaConcursoEstado += `<h4>${item}</h4>`
        }

    }

    for ( let i in documentoGeradoPCI ) {
        const item = documentoGeradoPCI[i]
        if (typeof(item) !== 'string') {
            const vagas = documentoGeradoPCI[i]['vagas']
            const link = documentoGeradoPCI[i]['site']
            const inscricao = documentoGeradoPCI[i]['data']

            for ( let linha in item ) {
                listaConcursos += `${i}, ${vagas} Inscrição Até: ${inscricao}<p><strong>Link:</strong> ${link}<p><br>`
            }
        } else {
            listaConcursos += `<h4>${item}</h4>`
        }
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
                if ( item.includes('Prepare-se e leia') ) {
                    listaExercito += `<div id="exercito">${item}</div>`
                } else {
                    listaExercito += `<h4>${item}</h4>`
                }
                
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
            let constSTR = '';
            for ( let linha in item ) {
                constSTR += ` ${item[linha]}`
            }
            listaFapec += `<p>${constSTR}</p>`
        } else {
            listaFapec += `<h4>${item}</h4>`
        }
    }

    for ( let i in documentoGeradoFiems ) {
        const item = documentoGeradoFiems[i]
        if (typeof(item) !== 'string') {
            let constSTR = '';
            for ( let linha in item ) {
                constSTR += ` ${item[linha]}`
            }
            listaFiems += `<p>${constSTR}</p>`
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
                padding-left: 10px;
                padding-right: 10px;
                padding-bottom: 5px;
                padding-top: 1px;
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

            div #exercito {
                color: red;
                font-size: 1.2em;
            }

            div #header {
                padding-left: 5px;
                padding-right: 5px;
                border-radius: 5px;
                margin: 10px;
                display: flex;
                justify-content: in-line;
            }
            
            div #esquerdo {
                height: 40%;
            }

            div #meio {
                padding: 5px;
                height: 30%;
            }

            div #direito {
                padding: 5px;
                height: 30%;
            }

        </style>

    </head>
    <body>
        <div id="header">
            <div id="esquerdo">
                <p>Prezado(a),</p>
                <p>Aqui estão as análises solicitadas:</p>
            </div>
            <div id="meio">
                <p></p>
            </div>
            <div id="direito">
                <p></p>
            </div>

        </div>
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

        ${estagio ? `
        <h3><strong>❕ PROCESSO SELETIVO ESTÁGIO TRT 24 REGIÃO MATO GROSSO DO SUL EDITAL 05/2024</strong></h3>
        <p>
            <div id="cards">
                ${listaSuperEstagios}
            </div>
        </p>

        ` : ''}

        <h3><strong>❕ Diário Oficial do Estado de Mato Grosso do Sul (DOE)</strong></h3>
        <p>
            <div id="cards">
                ${listaDOE}
            </div>
        </p>
        <h3><strong>❕ Diário Oficial de Campo Grande – MS (DIOGRANDE Digital)</strong></h3>
        <p>
            <div id="cards">
                ${listaDioGrande}
            </div>
        </p>
        
        <h3>❕ Noticias UFMS-Vestibular Digital</h3>
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
        
        <h3>❕ FIEMS</h3>
        <p>
            <div id="cards">
                ${listaFiems}
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
            Atenciosamente, <strong>DevBoot~</strong></br>
        <div id=informativo>Este é um e-mail automático, favor não responder.</div></p>
    </div>
    </html>
    `
    let headCorpo = (() => {
         if (conteudo) {
             return `Atualizações - UFMS, OTT, DOE, DIOGrande MS ${ano}`;
         } else {
             return `Atualizações - DOE, DIOGRANDE MS, Outros ${ano}`;
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
    func(run);
}
