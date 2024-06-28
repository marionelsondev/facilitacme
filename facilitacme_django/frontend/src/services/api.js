import axios from 'axios';

// Configura o Axios para fazer requisições para a URL base da API
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default api;