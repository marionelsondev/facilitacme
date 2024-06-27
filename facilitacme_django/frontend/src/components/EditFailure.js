import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles.css';

const EditFailure = () => {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [material, setMaterial] = useState('');
    const [materials, setMaterials] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`failures/${id}/`)
            .then(response => {
                setDescription(response.data.description);
                setStage(response.data.stage);
                setMaterial(response.data.material);
            })
            .catch(error => {
                console.error('Erro ao buscar a falha!', error);
            });

        api.get('materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os materiais!', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFailure = {
            description,
            stage,
            material: parseInt(material),
        };

        api.put(`failures/${id}/`, updatedFailure)
            .then(response => {
                console.log('Falha atualizada com sucesso:', response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Erro ao atualizar a falha!', error);
                console.error('Detalhes do erro:', error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Editar Falha</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Etapa</label>
                    <select
                        className="form-control"
                        value={stage}
                        onChange={e => setStage(e.target.value)}
                        required
                    >
                        <option value="">Selecione a Etapa</option>
                        <option value="RECEBIMENTO">Recebimento</option>
                        <option value="LAVAGEM">Lavagem</option>
                        <option value="PREPARO">Preparo</option>
                        <option value="DISTRIBUIÇÃO">Distribuição</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Material</label>
                    <select
                        className="form-control"
                        value={material}
                        onChange={e => setMaterial(e.target.value)}
                        required
                    >
                        <option value="">Selecione o Material</option>
                        {materials.map(material => (
                            <option key={material.id} value={material.id}>
                                {material.name} - {material.material_type}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Atualizar Falha</button>
            </form>
        </div>
    );
};

export default EditFailure;