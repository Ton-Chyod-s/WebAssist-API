// const axios = require('axios');
// const cheerio = require('cheerio');

// async function funcDioGrande(nome) {
//     nome = nome.replace(/\s/g, '%20').toUpperCase();
//     const site = `https://diogrande.campogrande.ms.gov.br/edicoes/?palavra=${nome}&numero=&de=&ate=`;
//     const response = await request.get(site);

//     let cont = 0;

//     while (true) {
//         const $ = cheerio.load(response.data);
//         const cards = $('iframe').map((i, item) => ({
//             texto: $(item).text().trim()
//         })).get();

//         console.log(cards.length);

//         const ultimaPosicao = cards.length - 1;

//         if ( ultimaPosicao === -1 ) {
//             continue;
//         } else {
//             cont = 1;
//         }

//         if (cont !== 0) {
//             break;
//         }
            
//     }
    
//     console.log(cards);


// }   



// if (require.main === module) {
//     async function test() {
//         const result = await funcDioGrande('silvianny aparecida faria camilo');
//         console.log(result);
//     }
//     test()
// }




// // Definindo a URL para onde os dados serão enviados
// const url = 'https://www.spdo.ms.gov.br/diariodoe';

// // Definindo os dados que serão enviados
// const data = { nome: 'silvianny aparecida faria camilo' };

// // Fazendo a requisição POST
// axios.post(url, data)
//   .then(function (response) {
//     // Carregar o HTML da resposta com cheerio
//     const $ = cheerio.load(response.data);
//     cont = 0;

//     while (true) {
//         // Mapear os elementos span e extrair o texto
//         const cards = $('tr').map((i, item) => ({
//             texto: $(item).text().trim()
//         })).get();
    
//         console.log(cards);

//         if ( cont === 1 ) {
//             break;
//         }


//     }
//   })
//   .catch(function (error) {
//     console.error('Error sending data:', error);
//   });

// const lol = 'lol';


