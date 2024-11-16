const axios = require('axios');
const FormData = require('form-data');

const url = 'https://www.spdo.ms.gov.br/DiarioDOE/Index/Index/1';

const headers = {
    'Accept': '*/*',
    'content-type': 'multipart/form-data',
    'cookie': 'BIGipServerVS086_HTTPS.app~VS086_HTTPS_pool=403444908.20480.0000; _pk_id.154.2d6c=34726f0b52ea7332.1731710887.; _pk_ref.154.2d6c=%5B%22%22%2C%22%22%2C1731715385%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D',
};

const form = new FormData();
form.append('Filter.DataInicial', '01/01/2024');
form.append('Filter.DataFinal', '15/11/2024');
form.append('Filter.Texto', ' ');
form.append('Filter.TipoBuscaEnum', '1');

async function fetchData() {
  try {
    const customHeaders = { 
      ...headers, 
      ...form.getHeaders() 
    };

    const response = await axios.post(url, form, { headers: customHeaders });

    console.log(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
  }
}

if(require.main === module) {
    fetchData();
}   
