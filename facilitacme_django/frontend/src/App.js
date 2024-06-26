import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MaterialsList from './components/MaterialsList';
import MaterialDetail from './components/MaterialDetail';
import AddMaterial from './components/AddMaterial';
import EditMaterial from './components/EditMaterial';

function App() {
    return (
        <Router>
            <div>
                <h1>Material Management System</h1>
                <Routes>
                    <Route path="/" element={<MaterialsList />} />
                    <Route path="/materials/:id" element={<MaterialDetail />} />
                    <Route path="/add-material" element={<AddMaterial />} />
                    <Route path="/edit-material/:id" element={<EditMaterial />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;