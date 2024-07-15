const axios = require('axios');
const cheerio = require('cheerio');
const { func } = require('./func');

let dictUfms = new Object();

let dictUfms1Sem = new Object();
let dictUfms2Sem = new Object();

const anoAtual = new Date().getFullYear().toString();

async function UFMS() {
    try {
        const response = await axios.get("https://ingresso.ufms.br/publicacao/movimentacao-interna/");
        dictUfms['site'] = 'https://ingresso.ufms.br/publicacao/movimentacao-interna/';
        const $ = cheerio.load(response.data);
        const countries = $('div[class="box-border"]').map((i, item) => ({
            texto: $(item).text().trim()
        })).get();
        const ano = new Date().getFullYear().toString();

        for (let i = 1; i < countries.length && i < 5; i++) {
            const limpo = countries[i].texto.replace(/\t/g, '').replace(/\n/, '').split('\n');
            const dictCountries2 = limpo.filter((item) => item !== '');
            const semestre = countries[i].texto.split(' – ')[1].split(' ')[0];
            const anoSemestre = countries[i].texto.split(' – ')[1].split('\n')[0].split(' ')[3];
            const condicao = dictCountries2[1];
        
            if (anoSemestre === ano) {
                if (semestre.includes("1")) {
                    if (condicao === "CONCLUÍDO") {

                        dictUfms[dictCountries2[0]] = {
                            "Atenção": "Chamada de candidatos para matrícula - Concluida."
                        };

                    } else {
                        let dataPubli;
                        let publicacao;
                        let cont = 0;
                        for (let i = 0; i < dictCountries2.length; i++) {
                            const element = dictCountries2[i].split(' ');
                            if ( element.length === 6 ) {
                                dataPubli = dictCountries2[i]  
                            
                            } else if (dictCountries2[i] != 'EM ANDAMENTO') {
                                publicacao = dictCountries2[i]
                                if ( !publicacao.includes('  Ver mais Movimentação Interna') && !publicacao.includes(`Movimentação Interna e Reingresso – 1º Semestre de ${anoAtual}`)) {
                                    dictUfms1Sem[`${dataPubli} ${cont}`] = publicacao
                                    cont++;
                                }  
                            }
                        }

                        dictUfms[dictCountries2[0]] = dictCountries2;  
                    }
                } else if (semestre.includes("2")) {
                    if (condicao === "CONCLUÍDO") {
                        dictUfms[dictCountries2[0]] = {
                            "Atenção": "Chamada de candidatos para matrícula - Concluida."
                        };

                    } else {
                        let dataPubli;
                        let publicacao;
                        let cont = 0;
                        
                        for (let i = 0; i < dictCountries2.length; i++) {
                            const element = dictCountries2[i].split(' ');
                            if ( element.length === 6 ) {
                                dataPubli = dictCountries2[i]  
                            
                            } else if (dictCountries2[i] != 'EM ANDAMENTO') {
                                publicacao = dictCountries2[i]
                                if ( !publicacao.includes('  Ver mais Movimentação Interna') && !publicacao.includes(`Movimentação Interna e Reingresso – 2º Semestre de ${anoAtual}`)) {
                                    dictUfms2Sem[`${dataPubli} ${cont}`] = publicacao
                                    cont++;
                                }  
                            }
                        }
                        
                        dictUfms[dictCountries2[0]] = dictUfms2Sem;
                    }
                }

            }
        }
        
        return dictUfms
    } catch (error) {
        return error;
    }

}

module.exports = { UFMS };

if (require.main === module) {
    func(UFMS);
}
