import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [currentStage, setCurrentStage] = useState('');
    
    // Hook para buscar os detalhes do material
    useEffect(() => {
        api.get(`materials/${id}/`)
            .then(response => {
                const { name, material_type, current_stage } = response.data;
                setName(name);
                setMaterialType(material_type);
                setCurrentStage(current_stage);
            })
            .catch(error => {
                console.error('Erro ao buscar os detalhes do material!', error);
            });
    }, [id]);

     // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedMaterial = {
            name,
            material_type: materialType,
            current_stage: currentStage,
        };

        api.put(`materials/${id}/`, updatedMaterial)
            .then(response => {
                console.log('Material updated successfully:', response.data);
                navigate('/materials');
            })
            .catch(error => {
                console.error('Erro ao atualizar o material!', error);
                console.error('Detalhes do erro:', error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Editar Material</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Material</label>
                    <select 
                        className="form-control" 
                        value={materialType} 
                        onChange={e => setMaterialType(e.target.value)} 
                        required
                    >
                        <option value="">Selecione o Tipo de Material</option>
                        <option value="Instrumental">Instrumental</option>
                        <option value="Descartável">Descartável</option>
                        <option value="Equipamento">Equipamento</option>
                        <option value="Cirúrgico">Cirúrgico</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Etapa Atual</label>
                    <select 
                        className="form-control" 
                        value={currentStage} 
                        onChange={e => setCurrentStage(e.target.value)} 
                        required
                    >
                        <option value="">Selecione a Etapa Atual</option>
                        <option value="RECEBIMENTO">Recebimento</option>
                        <option value="LAVAGEM">Lavagem</option>
                        <option value="PREPARO">Preparo</option>
                        <option value="DISTRIBUIÇÃO">Distribuição</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditMaterial;