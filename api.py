from bs4 import BeautifulSoup
from datetime import date
import requests
import re
from fastapi import FastAPI
from typing import Dict, Any

json = dict()
analysis = dict()

def exam_region(source_code, region):
    # Convert source code to string
    source_code_str = str(source_code)

    # Type of information
    name = ['Concurso']
    vagas = ['Vagas']
    nivel = ['Nível']
    salario = ['Salário Até']
    inscricao = ['Inscrição Até']
    link = ['Link']
    combinacao_concursos = []

    # Select the region
    if region == 'nacional':
        initial_tag = source_code_str.find('<h2>NACIONAL</h2>') + len('<h2>NACIONAL</h2>')
        final_tag = source_code_str.find('<h2>REGIÃO SUDESTE</h2>') + len('<h2>REGIÃO SUDESTE</h2>')

    elif region == 'CE':
        initial_tag = source_code_str.find('<div class="uf">CEARÁ</div>') + len('<div class="uf">CEARÁ</div>')
        final_tag = source_code_str.find('<div class="uf">MARANHÃO</div>') + len('<div class="uf">MARANHÃO</div>')

    elif region == 'SP':
        initial_tag = source_code_str.find('<div class="uf">SÃO PAULO</div>') + len('<div class="uf">SÃO PAULO</div>')
        final_tag = source_code_str.find('<div class="uf">RIO DE JANEIRO</div>') + len('<div class="uf">RIO DE JANEIRO</div>')

    elif region == 'RJ':
        initial_tag = source_code_str.find('<div class="uf">RIO DE JANEIRO</div>') + len('<div class="uf">RIO DE JANEIRO</div>')
        final_tag = source_code_str.find('<div class="uf">MINAS GERAIS</div>') + len('<div class="uf">MINAS GERAIS</div>')

    elif region == 'MG':
        initial_tag = source_code_str.find('<div class="uf">MINAS GERAIS</div>') + len('<div class="uf">MINAS GERAIS</div>')
        final_tag = source_code_str.find('<div class="uf">ESPÍRITO SANTO</div>') + len('<div class="uf">ESPÍRITO SANTO</div>')

    elif region == 'ES':
        initial_tag = source_code_str.find('<div class="uf">ESPÍRITO SANTO</div>') + len('<div class="uf">ESPÍRITO SANTO</div>')
        final_tag = source_code_str.find('<h2>REGIÃO SUL</h2>') + len('<h2>REGIÃO SUL</h2>')

    elif region == 'PR':
        initial_tag = source_code_str.find('<div class="uf">PARANÁ</div>') + len('<div class="uf">PARANÁ</div>')
        final_tag = source_code_str.find('<div class="uf">RIO GRANDE DO SUL</div>') + len('<div class="uf">RIO GRANDE DO SUL</div>')

    elif region == 'SC':
        initial_tag = source_code_str.find('<div class="uf">SANTA CATARINA</div>') + len('<div class="uf">SANTA CATARINA</div>')
        final_tag = source_code_str.find('<h2>REGIÃO CENTRO-OESTE</h2>') + len('<h2>REGIÃO CENTRO-OESTE</h2>')

    elif region == 'DF':
        initial_tag = source_code_str.find('<div class="uf">DISTRITO FEDERAL</div>') + len('<div class="uf">DISTRITO FEDERAL</div>')
        final_tag = source_code_str.find('<div class="uf">GOIÁS</div>') + len('<div class="uf">GOIÁS</div>')

    elif region == 'GO':
        initial_tag = source_code_str.find('<div class="uf">GOIÁS</div>') + len('<div class="uf">GOIÁS</div>')
        final_tag = source_code_str.find('<div class="uf">MATO GROSSO DO SUL</div>') + len('<div class="uf">MATO GROSSO DO SUL</div>')

    elif region == 'MS':
        initial_tag = source_code_str.find('<div class="uf">MATO GROSSO DO SUL</div>') + len('<div class="uf">MATO GROSSO DO SUL</div>')
        final_tag = source_code_str.find('<div class="uf">MATO GROSSO</div>') + len('<div class="uf">MATO GROSSO</div>')

    elif region == 'MT':
        initial_tag = source_code_str.find('<div class="uf">MATO GROSSO</div>') + len('<div class="uf">MATO GROSSO</div>')
        final_tag = source_code_str.find('<h2>REGIÃO NORTE</h2>') + len('<h2>REGIÃO NORTE</h2>')

    elif region == 'AM':
        initial_tag = source_code_str.find('<div class="uf">AMAZONAS</div>') + len('<div class="uf">AMAZONAS</div>')
        final_tag = source_code_str.find('<div class="uf">ACRE</div>') + len('<div class="uf">ACRE</div>')

    elif region == 'AC':
        initial_tag = source_code_str.find('<div class="uf">ACRE</div>') + len('<div class="uf">ACRE</div>')
        final_tag = source_code_str.find('<div class="uf">PARÁ</div>') + len('<div class="uf">PARÁ</div>')

    elif region == 'PA':
        initial_tag = source_code_str.find('<div class="uf">PARÁ</div>') + len('<div class="uf">PARÁ</div>')
        final_tag = source_code_str.find('<div class="uf">RONDÔNIA</div>') + len('<div class="uf">RONDÔNIA</div>')

    elif region == 'RO':
        initial_tag = source_code_str.find('<div class="uf">RONDÔNIA</div>') + len('<div class="uf">RONDÔNIA</div>')
        final_tag = source_code_str.find('<div class="uf">TOCANTINS</div>') + len('<div class="uf">TOCANTINS</div>')

    elif region == 'TO':
        initial_tag = source_code_str.find('<div class="uf">TOCANTINS</div>') + len('<div class="uf">TOCANTINS</div>')
        final_tag = source_code_str.find('<h2>REGIÃO NORDESTE</h2>') + len('<h2>REGIÃO NORDESTE</h2>')

    elif region == 'AL':
        initial_tag = source_code_str.find('<div class="uf">ALAGOAS</div>') + len('<div class="uf">ALAGOAS</div>')
        final_tag = source_code_str.find('<div class="uf">BAHIA</div>') + len('<div class="uf">BAHIA</div>')

    elif region == 'BA':
        initial_tag = source_code_str.find('<div class="uf">BAHIA</div>') + len('<div class="uf">BAHIA</div>')
        final_tag = source_code_str.find('<div class="uf">CEARÁ</div>') + len('<div class="uf">CEARÁ</div>')

    elif region == 'MA':
        initial_tag = source_code_str.find('<div class="uf">MARANHÃO</div>') + len('<div class="uf">MARANHÃO</div>')
        final_tag = source_code_str.find('<div class="uf">PARAÍBA</div>') + len('<div class="uf">PARAÍBA</div>')

    elif region == 'PA':
        initial_tag = source_code_str.find('<div class="uf">PARAÍBA</div>') + len('<div class="uf">PARAÍBA</div>')
        final_tag = source_code_str.find('<div class="uf">PERNAMBUCO</div>') + len('<div class="uf">PERNAMBUCO</div>')

    elif region == 'PE':
        initial_tag = source_code_str.find('<div class="uf">PERNAMBUCO</div>') + len('<div class="uf">PERNAMBUCO</div>')
        final_tag = source_code_str.find('<div class="uf">PIAUÍ</div>') + len('<div class="uf">PIAUÍ</div>')

    elif region == 'PI':
        initial_tag = source_code_str.find('<div class="uf">PIAUÍ</div>') + len('<div class="uf">PIAUÍ</div>')
        final_tag = source_code_str.find('<div class="uf">RIO GRANDE DO NORTE</div>') + len('<div class="uf">RIO GRANDE DO NORTE</div>')

    elif region == 'RN':
        initial_tag = source_code_str.find('<div class="uf">RIO GRANDE DO NORTE</div>') + len('<div class="uf">RIO GRANDE DO NORTE</div>')
        final_tag = source_code_str.find('<div class="uf">SERGIPE</div>') + len('<div class="uf">SERGIPE</div>')

    elif region == 'SE':
        initial_tag = source_code_str.find('<div class="uf">SERGIPE</div>') + len('<div class="uf">SERGIPE</div>')
        final_tag = source_code_str.find('<p style="text-align:center; margin:0; padding:10px 0 0 0; font-weight:bold; color:#205c98;">VISITE PERIODICAMENTE - ATUALIZAÇÃO DIÁRIA!!!</p>') + len('<p style="text-align:center; margin:0; padding:10px 0 0 0; font-weight:bold; color:#205c98;">VISITE PERIODICAMENTE - ATUALIZAÇÃO DIÁRIA!!!</p>')


    # Web-scraping
    concursos_tag = source_code_str[initial_tag:final_tag]
    concursos_tag = BeautifulSoup(concursos_tag, "html.parser")

    for line in concursos_tag.findAll(class_='ca'):
        name.append(line.find('a').text.strip())  # Institution's name
        link.append(line.find('a', href=True)['href'])  # Link
        vagas.append(''.join(re.findall(r'(\d*) vaga', str(line.find(class_='cd')))))  # Jobs
        nivel.append('/'.join(re.findall(r'Superior|Médio', str(line.find(class_='cd')))))  # Education
        salario.append(''.join(re.findall(r'(R\$ *\d*\.*\d*\,*\d*)', str(line.find(class_='cd')))))  # Salary
        inscricao.append(''.join(re.findall(r'(\d+/\d+/\d+)', str(line.find(class_='ce'))))) # Subscription date

    # Merge lists
    combinacao_concursos.extend([list(i) for i in zip(name, vagas, nivel, salario, inscricao, link)])

    return combinacao_concursos

# Date
today = date.today()
date_now = today.strftime("%d%m%Y")

# Get source code
LINK = "https://www.pciconcursos.com.br/concursos/"
response = requests.get(LINK)
soup = BeautifulSoup(response.text, "html.parser")

app = FastAPI()

@app.get("/")
def concursos_root():
    return {"/estado/{Estado}": "exemplo: /estado/MS"}     

@app.get("/estado/{item_id}")
def estado(item_id: str) -> Dict[str, Any]:
    json = dict()

    # Extract one state
    state = exam_region(soup, item_id.upper())

    for key, value in enumerate(state):
        if ( key != 0 ):
            name = state[key][0]
            for i in range(1, len(value)):
                analysis[state[0][i]] = state[key][i]
            json[name] = analysis
        analysis = dict()

    return json 
