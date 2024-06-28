import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddFailure = () => {
    // Definição dos estados locais para o formulário
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [material, setMaterial] = useState('');
    const [materials, setMaterials] = useState([]);
    const navigate = useNavigate();

    // Hook para buscar os materiais disponíveis na API ao carregar o componente
    useEffect(() => {
        api.get('materials/')
            .then(response => {
                setMaterials(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os materiais!', error);
            });
    }, []);

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        const newFailure = {
            description,
            stage,
            material: parseInt(material) // Assegura que o material está sendo passado como um número
        };

        api.post('failures/', newFailure)
            .then(response => {
                console.log('Falha adicionada com sucesso:', response.data);
                navigate('/failures'); // Redireciona para a lista de falhas após adicionar
            })
            .catch(error => {
                console.error('Erro ao adicionar a falha!', error);
                console.error('Detalhes do erro:', error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Adicionar Falha</h1>
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
                        {materials.map(mat => (
                            <option key={mat.id} value={mat.id}>{mat.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Adicionar Falha</button>
            </form>
        </div>
    );
};

export default AddFailure;