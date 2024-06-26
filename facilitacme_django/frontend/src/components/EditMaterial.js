import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [currentStage, setCurrentStage] = useState('');

    useEffect(() => {
        api.get(`/materials/${id}/`)
            .then(response => {
                const material = response.data;
                setName(material.name);
                setMaterialType(material.material_type);
                setCurrentStage(material.current_stage);
            })
            .catch(error => {
                console.error('There was an error fetching the material!', error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/materials/${id}/`, {
                name,
                material_type: materialType,
                current_stage: currentStage,
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error updating the material!', error);
        }
    };

    return (
        <div>
            <h1>Edit Material</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Material Type:</label>
                    <input
                        type="text"
                        value={materialType}
                        onChange={(e) => setMaterialType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Current Stage:</label>
                    <select
                        value={currentStage}
                        onChange={(e) => setCurrentStage(e.target.value)}
                    >
                        <option value="RECEIVING">Recebimento</option>
                        <option value="WASHING">Lavagem</option>
                        <option value="PREPARATION">Preparo</option>
                        <option value="DISTRIBUTION">Distribuição</option>
                    </select>
                </div>
                <button type="submit">Update Material</button>
            </form>
        </div>
    );
};

export default EditMaterial;