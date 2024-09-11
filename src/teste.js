const { vestDigital } = require('./func/funcVestDigital.js');

(async function() {
    let documentoUfmsGeral = await vestDigital();
    console.log(documentoUfmsGeral)

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
})();


