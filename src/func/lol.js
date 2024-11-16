const axios = require('axios');

const url = 'https://diogrande.campogrande.ms.gov.br/wp-admin/admin-ajax.php';

async function fetchData() {
  try {
    const params = {
      action: 'edicoes_json',
      palavra: ' ',
      numero: '',
      de: '01/01/2024',
      ate: '15/11/2024',
      _0: '0.5278609866886916',
      draw: '1',
      'columns[0][data]': 'numero',
      'columns[0][name]': '',
      'columns[0][searchable]': 'true',
      'columns[0][orderable]': 'false',
      'columns[0][search][value]': '',
      'columns[0][search][regex]': 'false',
      'columns[1][data]': 'desctpd',
      'columns[1][name]': '',
      'columns[1][searchable]': 'true',
      'columns[1][orderable]': 'false',
      'columns[1][search][value]': '',
      'columns[1][search][regex]': 'false',
      'columns[2][data]': 'dia',
      'columns[2][name]': '',
      'columns[2][searchable]': 'true',
      'columns[2][orderable]': 'false',
      'columns[2][search][value]': '',
      'columns[2][search][regex]': 'false',
      'columns[3][data]': 'codigodia',
      'columns[3][name]': '',
      'columns[3][searchable]': 'false',
      'columns[3][orderable]': 'false',
      'columns[3][search][value]': '',
      'columns[3][search][regex]': 'false',
      'order[0][column]': '0',
      'order[0][dir]': 'desc',
      start: '0',
      length: '10',
      'search[value]': '',
      'search[regex]': 'false',
      _: '1731713903501',
    };

    const response = await axios.get(url, { params });

    console.log(response.data["data"]);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
  }
}

if(require.main === module) {
    fetchData();
}
