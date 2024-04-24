# WebScraping-NodeJS

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

1. --------
2. Para realizar o webscraping com as bibliotecas instaladas, você pode criar um script como o exemplo abaixo:
   - **Exemplo axios e cheerio**
        ```bash
        const axios = require('axios');
        const cheerio = require('cheerio');
    

2. Execute os scripts conforme necessário para realizar o webscraping ou gerar capturas de tela das páginas web.

