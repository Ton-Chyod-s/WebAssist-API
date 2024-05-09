const { axios } = require('./axios');

const ano = new Date().getFullYear().toString();

async function fiems() {
    let documento = "";
    const response = await axios.get('https://www.fiems.com.br/');

    documento += `<p>FIEMS</p>`;
    documento += `<p>${response.data}</p>`;

    return documento;
}

module.exports = { fiems };