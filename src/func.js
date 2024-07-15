require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? ".env" : ".env"
  })

const lista = process.env.LIST_NAME_SCRAPINING.split(',');

function func(func_test) {
    // Iterar de 0 em 3 para processar triples (nome, email, cond)
    for (let i = 0; i < lista.length; i += 4) {
        const nome = lista[i];
        const email = lista[i + 1];
        const cond = lista[i + 2];
        const cond1 = lista[i + 3];
        
        if ( cond === 'false' && cond1 === 'true' ) {
            (async function Testando () {
                const test = await func_test(nome,email,false)
            })();
            
        } else if ( cond === 'true' && cond1 === 'false' ) {
            (async function Testando () {
                const test = await func_test(nome,email,true,false)
            })();

        } else if ( cond === 'false' && cond1 === 'false' ) {
            (async function Testando () {
                const test = await func_test(nome,email,false,false)
            })();

        } else {
            (async function Testando () {
                const test = await func_test(nome,email)
                console.log(test)
            })();
        }   
    }
}

module.exports = { func }
