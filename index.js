const express = require('express');
const server = express();
const PORT = 3000;

// nodemon index.js

server.get('/', (req,res) => {
    
    text = {
        ' ': 'Api WebScrap'
    }
    return res.json(text)
})

server.listen(PORT, () => {
    console.log('Servidor está funcionando!')
})