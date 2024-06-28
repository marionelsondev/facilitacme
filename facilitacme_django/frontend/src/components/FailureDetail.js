import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const FailureDetail = () => {
    const { id } = useParams();
    const [failure, setFailure] = useState(null);

    // Hook para buscar os detalhes da falha
    useEffect(() => {
        api.get(`failures/${id}/`)
            .then(response => {
                setFailure(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar a falha!', error);
            });
    }, [id]);

    if (!failure) return <p>Carregando...</p>;

    return (
        <div className="container mt-5 text-center">
            <h1 className="project-title">Detalhes da Falha</h1>
            <table className="table table-bordered mt-4">
                <tbody>
                    <tr>
                        <th scope="row">Descrição</th>
                        <td>{failure.description}</td>
                    </tr>
                    <tr>
                        <th scope="row">Etapa</th>
                        <td>{failure.stage}</td>
                    </tr>
                    <tr>
                        <th scope="row">Material</th>
                        <td>{failure.material_name}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={`/failures/${failure.id}/edit`}>
                <button className="btn btn-primary mt-3">Editar Falha</button>
            </Link>
        </div>
    );
};

export default FailureDetail;