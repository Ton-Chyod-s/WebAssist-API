const { DOE } = require('./src/funcDoe');
const { DIOGrande } = require('./src/funcDioGrande');
const { fapec } = require('./src/funcFapec');
const { concursoEstado } = require('./src/funcConcursoEstado');
const { Exercito } = require('./src/funcExercito');
const { UFMS } = require('./src/funcUfms');
const { seges } = require('./src/funcSeges');
const { fiems } = require('./src/funcFiems');
const { exam_region } = require('./src/funcPCI');
const express = require('express');
const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
    return res.json({
        "": "Welcome to the Web Assist API! Here are the available endpoints:",
        "DOE": " /DOE/:id {nome do usuario}",
        "DIOGRANDE": " /DIOGRANDE/:id {nome do usuario}",
        'FAPEC': '/fapec',
        'CONCURSOESTADO': '/concursoEstado',
        'EXERCITO': '/Exercito',
        'UFMS': '/UFMS',
        'SEGES': '/seges',
        'FIEMS': '/fiems',
        'PCI': '/PCI/:id {nome do usuario}'
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
        return res.status(500).json({ 'error DOE': 'Ocorreu um erro ao buscar os dados' });
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
        return res.status(500).json({ 'error DIOGRANDE': 'Ocorreu um erro ao buscar os dados' });
    }
});

server.get('/fapec', async (req, res) => {
    const fapecLista = await fapec();
    
    return res.json(fapecLista);
});

server.get('/concursoEstado', async (req, res) => {
    const concursoEstadoLista = await concursoEstado();
    const startIndex = concursoEstadoLista.split('<br><br>');
    const dicionario = new Object();
    
    for (let i = 0; i < startIndex.length; i++) {
        const start = startIndex[i].replace('\u003Cstrong\u003E','').replace('\u003C/strong\u003E','').replace('Site:','').replace(' ','');
        if (start !== '') {
            dicionario[`index ${i}`] = start;
        }}
    return res.json(dicionario);
});

server.get('/Exercito', async (req, res) => {
    const texto = await Exercito();
    
    return res.json(texto);
});

server.get('/UFMS', async (req, res) => {
    const texto = await UFMS();
    
    return res.json(texto);
});

server.get('/seges', async (req, res) => {
    const texto = await seges();
    const startIndex = texto.split('<br><br>');
    const dicionario = new Object();

    for (let i = 0; i < startIndex.length; i++) {
        const elemento = startIndex[i].replace('\u003Cbr\u003E','').replace('\u003Cstrong\u003E','').replace('\u003C/strong\u003E','').replace('Site: ','').replace(' ','');
        if (elemento !== '') {
            dicionario[`index ${i}`] = elemento;
        }
    }
    return res.json(dicionario);
});

server.get('/fiems', async (req, res) => {
    const texto = await fiems();

    return res.json(texto);
});


server.get('/PCI/:id', async (req, res) => {
    LINK = "https://www.pciconcursos.com.br/concursos/"
    const pci = exam_region(LINK, req.params.id);
    
    return res.json(pci);
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