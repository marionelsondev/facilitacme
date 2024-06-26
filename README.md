# Projeto Facilitacme Django

## Instruções de Configuração

### Pré-requisitos
- Python 3.8+
- Django 3.2
- Django REST framework
- xlsxwriter
- fpdf

### Instalação

1. Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd facilitacme_django
    ```

2. Crie e ative um ambiente virtual:
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows use `venv\Scripts\activate`
    ```

3. Instale as dependências necessárias:
    ```bash
    pip install -r requirements.txt
    ```

4. Aplique as migrações:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5. Execute o servidor de desenvolvimento:
    ```bash
    python manage.py runserver
    ```

### Uso

1. Acesse o site de administração em `http://127.0.0.1:8000/admin/` para gerenciar materiais e falhas.

2. Use os seguintes endpoints:
    - `http://127.0.0.1:8000/api/materials/`: Listar e gerenciar materiais
    - `http://127.0.0.1:8000/api/failures/`: Listar e gerenciar falhas
    - `http://127.0.0.1:8000/api/failures/generate_report/`: Gerar relatório de falhas em formato XLSX
    - `http://127.0.0.1:8000/api/materials/pdf_report/`: Gerar relatório em PDF para materiais que concluíram o processo

### Testes

Use ferramentas como o Postman para testar os endpoints da API e garantir que estão funcionando corretamente.

## Contribuição

Sinta-se à vontade para enviar problemas, fazer um fork do repositório e enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.