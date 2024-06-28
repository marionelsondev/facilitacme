import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const FailuresList = () => {
    const [failures, setFailures] = useState([]);
    const navigate = useNavigate();

    // Hook para buscar as falhas na API ao carregar o componente
    useEffect(() => {
        api.get('failures/')
            .then(response => {
                setFailures(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as falhas!', error);
            });
    }, []);

    // Função para deletar uma falha
    const handleDelete = (id) => {
        api.delete(`failures/${id}/`)
            .then(response => {
                setFailures(failures.filter(failure => failure.id !== id));
            })
            .catch(error => {
                console.error('Erro ao deletar a falha!', error);
            });
    };

    // Função para gerar o relatório de falhas
    const handleGenerateReport = () => {
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
                console.error('Erro ao gerar o relatório de falhas!', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Falhas</h2>
            <ul className="list-group">
                {failures.map(failure => (
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
                ))}
            </ul>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary custom-button" onClick={() => navigate('/add-failure')}>Adicionar Falha</button>
                <button className="btn btn-primary custom-button ml-2" onClick={handleGenerateReport}>Gerar Relatório XLSX</button>
            </div>
        </div>
    );
};

export default FailuresList;