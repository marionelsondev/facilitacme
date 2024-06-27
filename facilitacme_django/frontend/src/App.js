import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MaterialsList from './components/MaterialsList';
import AddMaterial from './components/AddMaterial';
import EditMaterial from './components/EditMaterial';
import MaterialDetail from './components/MaterialDetail';
import AddFailure from './components/AddFailure';
import FailuresList from './components/FailuresList';
import FailureDetail from './components/FailureDetail';
import EditFailure from './components/EditFailure';
import Home from './components/Home';
import './styles.css';

function App() {
    return (
        <Router>
            <nav className="navbar">
                <Link to="/" className="navbar-brand">Página inicial</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/materials" element={<MaterialsList />} />
                <Route path="/add-material" element={<AddMaterial />} />
                <Route path="/materials/:id/edit" element={<EditMaterial />} />
                <Route path="/materials/:id" element={<MaterialDetail />} />
                <Route path="/add-failure" element={<AddFailure />} />
                <Route path="/failures" element={<FailuresList />} />
                <Route path="/failures/:id" element={<FailureDetail />} />
                <Route path="/failures/:id/edit" element={<EditFailure />} />
            </Routes>
        </Router>
    );
}

export default App;