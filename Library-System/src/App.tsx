import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import UserBooksPage from './pages/UserBooksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/profile" element={<Profile />} />  
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-books" element={<UserBooksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
};
export default App;