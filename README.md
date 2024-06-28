# facilitaCME

FacilitaCME é uma aplicação web para gerenciar materiais e falhas nos processos de CMEs

## Funcionalidades

- Adicionar, editar e visualizar materiais
- Adicionar, editar e visualizar falhas
- Gerar relatórios em PDF e XLSX

## Tecnologias

- Backend: Django REST Framework
- Frontend: React, Bootstrap

## Requisitos

- Python 3.8+
- Node.js 14+

## Para instalar e iniciar a aplicação, siga os seguintes passos:

### Backend

1. Clone o repositório:
    ```sh
    git clone https://github.com/marionelsondev/facilitacme
    cd facilitacme
    ```

2. Crie e ative um ambiente virtual:
    ```sh
    # O ambiente virtual deve ser instalado no diretório >> \facilitacme
    python -m venv venv # Utilize esse comando dentro da pasta raiz 'facilitacme'
    venv\Scripts\activate  # Se estiver utilizando linux use `source venv/bin/activate`
    ```
3. Navegue até a pasta 'backend'
    ```
    \facilitacme\facilitacme_django\backend
    ```

4. Instale as dependências:
    ```sh
    pip install -r requirements.txt
    ```

5. Aplique as migrações:
    ```sh
    python manage.py migrate
    ```

6. Inicie o servidor:
    ```sh
    python manage.py runserver
    ```

### Frontend

1. Navegue até a pasta do frontend:
    ```sh
    \facilitacme\facilitacme_django\frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```
    
3. Instale o bootstrap
    ```sh
    npm install bootstrap
    ```

4. Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```
5. Acesse a aplicação web:
    ```sh
    acesse a url 'http://localhost:3000/'
    ```

## Estrutura do Projeto

### Backend

- `models.py`: Define os modelos do banco de dados
- `serializers.py`: Define os serializers para a API
- `views.py`: Define as views para a API
- `urls.py`: Define as rotas da API
- `utils.py`: Funções utilitárias para gerar relatórios

### Frontend

- `components/`: Contém os componentes React
- `services/api.js`: Configuração do Axios para fazer requisições à API
- `App.js`: Componente principal da aplicação
- `index.js`: Ponto de entrada do React
