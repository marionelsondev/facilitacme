import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import MaterialForm from './MaterialForm';

// Componente que lista os materiais e permite adicionar novos materiais
const MaterialsList = () => {
    // Estado para armazenar os materiais
    const [materials, setMaterials] = useState([]);

    // useEffect para buscar os materiais da API ao carregar o componente
    useEffect(() => {
        api.get('materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the materials!', error);
            });
    }, []);

    // Função para adicionar um novo material na lista
    const handleSave = (newMaterial) => {
        setMaterials([...materials, newMaterial]);
    };

    return (
        <div>
            <h1>Materials List</h1>
            <MaterialForm onSave={handleSave} />
            <ul>
                {materials.map(material => (
                    <li key={material.id}>
                        <Link to={`/materials/${material.id}`}>
                            {material.name} - {material.material_type}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MaterialsList;