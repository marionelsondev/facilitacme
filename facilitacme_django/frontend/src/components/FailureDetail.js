import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const FailureDetail = () => {
    const { id } = useParams();
    const [failure, setFailure] = useState(null);

    useEffect(() => {
        api.get(`failures/${id}/`)
            .then(response => {
                setFailure(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar a falha!', error);
            });
    }, [id]);

    if (!failure) {
        return <div className="container mt-5">Carregando...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Detalhes da Falha</h2>
            <div className="mt-4">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Descrição:</th>
                            <td>{failure.description}</td>
                        </tr>
                        <tr>
                            <th scope="row">Etapa:</th>
                            <td>{failure.stage}</td>
                        </tr>
                        <tr>
                            <th scope="row">Material:</th>
                            <td>{failure.material ? `${failure.material.name} - ${failure.material.material_type}` : 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Link to={`/failures/${failure.id}/edit`} className="btn btn-primary custom-button">Editar Falha</Link>
                </div>
            </div>
        </div>
    );
};

export default FailureDetail;