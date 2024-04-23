const { DOE } = require('./src/funcDoe');
const express = require('express');
const server = express();
const PORT = 3000;

// nodemon index.js

server.get('/DOE/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let documentoGeradoDOE = await DOE(id);
        return res.json(documentoGeradoDOE);
    } catch (error) {
        // Handle any errors that may occur during the asynchronous operation
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

server.listen(PORT, () => {
    console.log('Servidor está funcionando!')
})