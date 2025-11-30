import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </Router>
  );
};
export default App;