const { DOE } = require('./src/funcDoe');
const { DIOGrande } = require('./src/funcDioGrande');
const { fapec } = require('./src/funcFapec');
const express = require('express');
const server = express();
const PORT = 3000;

// nodemon index.js

server.get('/', (req, res) => {
    return res.json({
        "": "Welcome to the Web Assist API! Here are the available endpoints:",
        "DOE": " /DOE/:id {nome do usuario}",
        "DIOGRANDE": " /DIOGRANDE/:id {nome do usuario}",
    });
});


server.get('/DOE/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let documentoGeradoDOE = await DOE(id);
        if (!documentoGeradoDOE) {
            return res.status(404).json({
                'Nome': id, 
                error: 'Nenhum Diário Oficial Eletrônico (DOE) encontrado' 
            });
        }
        
        const startIndex = documentoGeradoDOE.indexOf('</p>') + 4;
        const diarioOficialEletronico = documentoGeradoDOE.substring(startIndex);
        
        return res.json({
            'Nome': id, 
            'Diário Oficial Eletrônico': diarioOficialEletronico
        });
        
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar os dados' });
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

server.get('/fapec', async (req, res) => {

    return res.json(await fapec());
    
});

server.get('*', (req, res) => {
    return res.status(404).json({ error: 'Endpoint não encontrado' });
});

server.get('/DOE', (req, res) => {
    return res.status(400).json({ error: 'Por favor, insira um nome para a busca' });
});

server.get('/DIOGRANDE', (req, res) => {
    return res.status(400).json({ error: 'Por favor, insira um nome para a busca' });
});


server.listen(PORT, () => {
    console.log('Servidor está funcionando!')
})