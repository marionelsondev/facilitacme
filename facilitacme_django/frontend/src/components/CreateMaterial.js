import React, { useState } from 'react';
import api from '../services/api';

const CreateMaterial = () => {
    const [name, setName] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [currentStage, setCurrentStage] = useState('RECEIVING');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/materials/', { name, material_type: materialType, current_stage: currentStage });
            alert('Material added successfully!');
            setName('');
            setMaterialType('');
            setCurrentStage('RECEIVING');
        } catch (error) {
            console.error('There was an error creating the material!', error);
        }
    };

    return (
        <div>
            <h2>Create Material</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Material Type:</label>
                    <input type="text" value={materialType} onChange={(e) => setMaterialType(e.target.value)} required />
                </div>
                <div>
                    <label>Current Stage:</label>
                    <select value={currentStage} onChange={(e) => setCurrentStage(e.target.value)}>
                        <option value="RECEIVING">Receiving</option>
                        <option value="WASHING">Washing</option>
                        <option value="PREPARATION">Preparation</option>
                        <option value="DISTRIBUTION">Distribution</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateMaterial;