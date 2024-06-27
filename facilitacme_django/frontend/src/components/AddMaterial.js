import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddMaterial = () => {
    const [name, setName] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [currentStage, setCurrentStage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newMaterial = {
            name,
            material_type: materialType,
            current_stage: currentStage,
        };

        api.post('materials/', newMaterial)
            .then(response => {
                console.log('Material adicionado com sucesso:', response.data);
                navigate('/materials');
            })
            .catch(error => {
                console.error('Erro ao adicionar o material!', error);
                console.error('Detalhes do erro:', error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Adicionar Material</h1>
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
                <button type="submit" className="btn btn-primary mt-3">Adicionar Material</button>
            </form>
        </div>
    );
};

export default AddMaterial;