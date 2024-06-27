import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Home = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="project-title">facilitaCME</h1>
            <div className="button-container">
                <Link to="/materials" className="btn btn-primary btn-lg custom-button">Listagem de Materiais</Link>
                <Link to="/failures" className="btn btn-secondary btn-lg custom-button">Listagem de Falhas</Link>
            </div>
        </div>
    );
};

export default Home;