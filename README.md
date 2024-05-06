# WebAssist-API

## Descrição

&emsp;&emsp;&emsp;Este projeto é um aplicativo de webscraping construído com Node.js, que utiliza as bibliotecas axios, cheerio e puppeteer para extrair dados de páginas web. Além disso, emprega a biblioteca nodemailer para enviar os resultados do webscraping por email. O objetivo é fornecer uma ferramenta eficiente e fácil de usar para coletar informações específicas da Internet e compartilhá-las automaticamente.

## Funcionalidades

- **Extração de Dados**: Utilize o axios e o cheerio para extrair dados de páginas web estáticas.
- **Navegação Automatizada**: Empregue o puppeteer para simular a navegação em páginas web dinâmicas e realizar ações como cliques e preenchimento de formulários.
- **Envio de Email**: Configure o nodemailer para enviar automaticamente os dados extraídos para um endereço de email especificado.
- **Interface Amigável**: Comandos simples e documentação clara tornam o uso do aplicativo acessível a usuários de todos os níveis técnicos.
- **Personalização**: Scripts configuráveis permitem que os usuários definam exatamente quais dados precisam ser coletados e como eles devem ser compartilhados.

## Iniciando

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- Git para clonar o repositório.
- Node.js que inclui o npm.

Este projeto também depende de algumas bibliotecas importantes que serão instaladas via npm:
- `axios` para fazer requisições HTTP.
- `cheerio` para manipulação de dados HTML.
- `puppeteer` para automação de navegadores web.
- `nodemailer` para o envio de e-mails com os resultados do webscraping.

Após instalar o Node.js, você pode instalar as bibliotecas necessárias com o seguinte comando:
   
    npm install axios cheerio puppeteer nodemailer
 
### Instalação

Para instalar este projeto, siga os passos abaixo:

1. Clone o repositório para a sua máquina local usando:
   ```bash
   git clone https://github.com/Ton-Chyod-s/WebScraping-NodeJS

1. Navegue até o diretório do projeto:
cd WebScraping-NodeJS

1. Instale as dependências do projeto com o comando:
npm install axios cheerio puppeteer

## Uso
Após a instalação, você pode começar a usar o projeto com os seguintes passos:

1. Para realizar o webscraping com as bibliotecas instaladas, você pode criar um script como o exemplo abaixo:
   - **Exemplo axios e cheerio**
  
    ```bash
        const axios = require('axios');
        const cheerio = require('cheerio');

        async function concursoEstado() {
            const site = 'http://www2.concursos.ms.gov.br/?location=editais'
        
            const response = await axios.get(site);

            const $ = cheerio.load(response.data);

            const cards = $('a').map((i, item) => ({
                texto: $(item).text().trim()
            })).get();
        }
    - **Exemplo puppeteer** 
    
    ```bash
        const puppeteer = require('puppeteer');
        const ano = new Date().getFullYear().toString();

        async function DOE(nome) {
            let head = "";
            let documento = "";

            const primeiroNome =  nome.split(' ')[0];
            const browser = await puppeteer.launch({
                // headless: false,
            });
            const page = await browser.newPage();
            await page.goto('https://www.spdo.ms.gov.br/diariodoe');

            // Preencher um campo
            await page.type('[id="Filter_Texto"]', nome);
            // clicar
            await page.locator('button').click();
            // esperando até encontrar o selector
            await page.waitForSelector('table[id="tbDiarios"]');
            // Aguardar um pouco
            await new Promise(resolve => setTimeout(resolve, 500));

            const planilhaHTML = await page.$$eval('table[id="tbDiarios"] > tbody > tr ',rows => rows.map(element => element.innerText));
            for (let i = 0; i < planilhaHTML.length; i++) {
                const element = planilhaHTML[i];
                if (element.includes(ano) && element.includes(primeiroNome)) {
                const data = element.split(' - ')[0].split('\t')[1];
                const DOE = element.split(' - ')[1];
                documento += `<p>${data}    ${DOE}</p>`;
                }
            };
            head += `<p>Nome: ${nome}   Ano: ${ano}</p>`;
            if (documento.length === 0) {
                documento += `${head}Lamento informar que não foram encontrados Diários Oficiais Eletrônicos (DOEs) associados ao seu nome até a presente data.`;
            } else {
                documento = head + documento;
            }
            await browser.close();
            return documento;
        }

1. Execute os scripts conforme necessário para realizar o webscraping ou gerar capturas de tela das páginas web.

- **config  envio de e-mail**

    ```bash
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "email a ser utilizado@gmail.com",
                pass: "senha de aplicativo",
            },
            });

        async function main(texto,imprimirConsole,assunto,para) {
            await transporter.sendMail({
                from: "Remetente",
                to: para,
                subject: assunto,
                html: texto
            });
            console.log(imprimirConsole)
        }

        module.exports = { main };
        }

