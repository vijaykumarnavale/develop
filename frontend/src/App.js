// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login.js'
import Dashboard from './dashboard.js';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
