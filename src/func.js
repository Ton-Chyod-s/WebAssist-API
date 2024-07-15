const lista = process.env.LIST_NAME_SCRAPINING.split(',');

// Iterar de 0 em 3 para processar triples (nome, email, cond)
for (let i = 0; i < lista.length; i += 3) {
    const nome = lista[i];
    const email = lista[i + 1];
    const cond = lista[i + 2];

    if ( cond === 'false' ) {
        (async function Testando () {
            const test = await concursoEstado()
            console.log(test)
        })();
        
    } else {
        
        (async function Testando () {
            const test = await concursoEstado()
            console.log(test)
        })();

    }   
}