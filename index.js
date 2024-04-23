const { DOE } = require('./src/funcDoe');
const { DIOGrande } = require('./src/funcDioGrande');
const express = require('express');
const server = express();
const PORT = 3000;

// nodemon index.js

server.get('/DOE/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let documentoGeradoDOE = await DOE(id);
        if (documentoGeradoDOE.includes('Lamento informar que não foram encontrados Diários Oficiais Eletrônicos (DOEs)')) {
            return res.json({
                'Nome': id, 
                error: 'Nenhum Diário Oficial Eletrônico (DOE) encontrado' 
            })} else {
                const startIndex = documentoGeradoDOE.indexOf('</p>') + '</p>'.length;
                const diarioOficialEletronico = documentoGeradoDOE.substring(startIndex);
                return res.json({
                    'Nome': id, 
                    'Diário Oficial Eletrônico': diarioOficialEletronico
                })
            }
    } catch (error) {
        // Handle any errors that may occur during the asynchronous operation
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});


server.get('/DIOGRANDE/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let documentoGeradoDIOGrande = await DIOGrande(id);
        if (documentoGeradoDIOGrande.includes('Lamento informar que não foram encontrados Diários Oficiais Digitais')) {
            return res.json({
                'Nome': id, 
                error: 'Nenhum Diário Oficial Digital foi encontrado' 
            })} else {
                const startIndex = documentoGeradoDIOGrande.indexOf('</p>') + '</p>'.length;
                const diarioOficialDigital = documentoGeradoDIOGrande.substring(startIndex);
                return res.json({
                    'Nome': id, 
                    'Diário Oficial Digital': diarioOficialDigital
                })
            }
    } catch (error) {
        // Handle any errors that may occur during the asynchronous operation
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});


server.listen(PORT, () => {
    console.log('Servidor está funcionando!')
})