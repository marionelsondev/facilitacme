import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]);
    const navigate = useNavigate();

    // Hook para buscar os materiais na API ao carregar o componente
    useEffect(() => {
        api.get('materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os materiais!', error);
            });
    }, []);

    // Função para deletar um material
    const handleDelete = (id) => {
        api.delete(`materials/${id}/`)
            .then(response => {
                setMaterials(materials.filter(material => material.id !== id));
            })
            .catch(error => {
                console.error('Erro ao deletar o material!', error);
            });
    };

    // Função para gerar o relatório de materiais
    const handleGeneratePDF = () => {
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
                console.error('Erro ao gerar o relatório!', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Materiais</h2>
            <ul className="list-group">
                {materials.map(material => (
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
                ))}
            </ul>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary custom-button" onClick={() => navigate('/add-material')}>Adicionar Material</button>
                <button className="btn btn-primary custom-button ml-2" onClick={handleGeneratePDF}>Gerar Relatório PDF</button>
            </div>
        </div>
    );
};

export default MaterialsList;