# facilitaCME

## Descrição
O facilitaCME é um sistema que gerencia materiais, rastreabilidade e outros recursos essenciais para a gestão eficiente do processo de esterilização das CMEs.

## Instalação

### Pré-requisitos
- Python 3.12.4
- pip

### Passos para instalação
1. **Clone o repositório**:
```sh
git clone https://github.com/marionelsondev/facilitacme.git
cd facilitacme
```
- Este comando clona o repositório do GitHub para a sua máquina local.
- O comando `cd facilitacme` navega para o diretório do projeto.

2. **Crie e ative o ambiente virtual**:
**Windows**:
```sh
python -m venv venv
venv\Scripts\activate
```
**macOS/Linux**:
```sh
python3 -m venv venv
source venv/bin/activate
```
- O ambiente virtual isola as dependências do projeto das bibliotecas Python instaladas globalmente.
- No Windows, você ativa o ambiente virtual com `venv\Scripts\activate`.
- No macOS/Linux, você ativa com 'source venv/bin/activate'.

3. **Instale as dependências**:
- O comando `pip install -r requirements.txt` instala todas as bibliotecas listadas no arquivo `requirements.txt`

4. **Crie o projeto Django**:
- O comando `django-admin startproject facilitacme_django` cria um novo projeto Django com a estrutura inicial necessária.
- O comando `cd facilitacme_django` navega até o diretório do projeto Django.

5. **Crie o aplicativo `materials`**:
- O comando `python manage.py startapp materials` cria um novo aplicativo Django chamado `materials`.

6. **Adicionar o aplicativo `materials` ao `INSTALLED_APPS`**:
- No arquivo `facilitacme_django/setting.py`, adicione `'rest_framework'` e `'materials'` à lista `INSTALLED_APPS` para registrar o aplicativo e o Django REST framework.

### Configuração de URLs
No aplicativo `materials`, as URLs são configuradas utilizando o `DefaultRouter` do Django REST framework para gerar automaticamente as rotas das APIs. O arquivo de configuração das URLs está localizado em `materials/urls.py`.

