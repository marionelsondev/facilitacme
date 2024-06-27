import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const MaterialDetail = () => {
    const { id } = useParams();
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        api.get(`materials/${id}/`)
            .then(response => {
                setMaterial(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar o material!', error);
            });
    }, [id]);

    if (!material) return <p>Carregando...</p>;

    return (
        <div className="container mt-5 text-center">
            <h1 className="project-title">Detalhes do Material</h1>
            <table className="table table-bordered mt-4">
                <tbody>
                    <tr>
                        <th scope="row">ID</th>
                        <td>{material.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Nome</th>
                        <td>{material.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tipo de Material</th>
                        <td>{material.material_type}</td>
                    </tr>
                    <tr>
                        <th scope="row">Etapa Atual</th>
                        <td>{material.current_stage}</td>
                    </tr>
                    <tr>
                        <th scope="row">Histórico de Etapas</th>
                        <td>{material.stages_history}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MaterialDetail;