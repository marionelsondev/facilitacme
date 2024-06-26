import React, { useState } from 'react';
import api from '../services/api';

const AddMaterial = () => {
    const [name, setName] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [currentStage, setCurrentStage] = useState('RECEIVING');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/materials/', {
                name,
                material_type: materialType,
                current_stage: currentStage,
            });
            alert('Material added successfully');
            // Optionally, redirect or update the list of materials
        } catch (error) {
            console.error('There was an error adding the material!', error);
            alert('Failed to add material');
        }
    };

    return (
        <div>
            <h1>Add Material</h1>
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
                <button type="submit">Add Material</button>
            </form>
        </div>
    );
};

export default AddMaterial;