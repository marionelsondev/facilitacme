import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]); // Estado para armazenar a lista de materiais
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

    useEffect(() => {
        // Busca todos os materiais da API
        api.get('materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os materiais!', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Deleta um material pelo ID
        api.delete(`materials/${id}/`)
            .then(response => {
                setMaterials(materials.filter(material => material.id !== id));
            })
            .catch(error => {
                console.error('Erro ao deletar o material!', error);
            });
    };

    const handleGeneratePDF = () => {
        // Gera o relatório em PDF dos materiais que concluíram o processo
        api.get('materials/pdf_report/', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'relatorio_materiais.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setError('Não foi possível gerar o relatório pois nenhum material concluiu o processo completo de esterilização.');
                } else {
                    console.error('Erro ao gerar o relatório!', error);
                }
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Materiais</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <ul className="list-group">
                {materials.length === 0 ? (
                    <li className="list-group-item">Ainda não há registros aqui</li>
                ) : (
                    materials.map(material => (
                        <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to={`/materials/${material.id}`}>{material.name} - {material.material_type}</Link>
                            <div>
                                <Link to={`/materials/${material.id}/edit`}>
                                    <button className="btn btn-primary btn-block">Editar</button>
                                </Link>
                                <button 
                                    className="btn btn-danger btn-block"
                                    onClick={() => handleDelete(material.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary custom-button" onClick={() => navigate('/add-material')}>Adicionar Material</button>
                <button className="btn btn-primary custom-button ml-2" onClick={handleGeneratePDF}>Gerar Relatório PDF</button>
            </div>
        </div>
    );
};

export default MaterialsList;