import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        api.get('/materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the materials!', error);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            try {
                await api.delete(`/materials/${id}/`);
                setMaterials(materials.filter(material => material.id !== id));
                alert('Material deleted successfully');
            } catch (error) {
                console.error('There was an error deleting the material!', error);
                alert('Failed to delete material');
            }
        }
    };

    return (
        <div>
            <h1>Materials List</h1>
            <ul>
                {materials.map(material => (
                    <li key={material.id}>
                        <Link to={`/materials/${material.id}`}>{material.name} - {material.material_type}</Link>
                        <button onClick={() => handleDelete(material.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/add-material">Add Material</Link>
        </div>
    );
};

export default MaterialsList;