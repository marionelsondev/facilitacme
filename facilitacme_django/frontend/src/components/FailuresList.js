import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const FailuresList = () => {
    const [failures, setFailures] = useState([]); // Estado para armazenar a lista de falhas
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

    useEffect(() => {
        // Busca todas as falhas da API
        api.get('failures/')
            .then(response => {
                setFailures(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as falhas!', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Deleta uma falha pelo ID
        api.delete(`failures/${id}/`)
            .then(response => {
                setFailures(failures.filter(failure => failure.id !== id));
            })
            .catch(error => {
                console.error('Erro ao deletar a falha!', error);
            });
    };

    const handleGenerateReport = () => {
        // Gera o relatório em XLSX das falhas
        api.get('failures/generate_report/', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'failure_report.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setError('Não foi possível gerar o relatório pois não existe nenhuma falha registrada.');
                } else {
                    console.error('Erro ao gerar o relatório de falhas!', error);
                }
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Falhas</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <ul className="list-group">
                {failures.length === 0 ? (
                    <li className="list-group-item">Ainda não há registros aqui</li>
                ) : (
                    failures.map(failure => (
                        <li key={failure.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to={`/failures/${failure.id}`}>{failure.description} - {failure.stage}</Link>
                            <div>
                                <Link to={`/failures/${failure.id}/edit`}>
                                    <button className="btn btn-primary btn-block">Editar</button>
                                </Link>
                                <button 
                                    className="btn btn-danger btn-block"
                                    onClick={() => handleDelete(failure.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary custom-button" onClick={() => navigate('/add-failure')}>Adicionar Falha</button>
                <button className="btn btn-primary custom-button ml-2" onClick={handleGenerateReport}>Gerar Relatório XLSX</button>
            </div>
        </div>
    );
};

export default FailuresList;