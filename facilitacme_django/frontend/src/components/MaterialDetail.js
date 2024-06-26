import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const MaterialDetail = () => {
    const { id } = useParams();
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        api.get(`/materials/${id}/`)
            .then(response => {
                setMaterial(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the material details!', error);
            });
    }, [id]);

    if (!material) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Material Details</h2>
            <p><strong>ID:</strong> {material.id}</p>
            <p><strong>Name:</strong> {material.name}</p>
            <p><strong>Material Type:</strong> {material.material_type}</p>
            <p><strong>Current Stage:</strong> {material.current_stage}</p>
            <p><strong>Stages History:</strong> {material.stages_history}</p>
        </div>
    );
};

export default MaterialDetail;