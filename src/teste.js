const { vestDigital } = require('./func/funcVestDigital.js');
let listaUFMSGeral;

(async function() {
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

    console.log(listaUFMSGeral)
})();


