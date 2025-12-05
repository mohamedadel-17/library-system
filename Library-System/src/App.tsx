import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { MOCK_USERS } from "@/data/mockUsers"; // تم حذف الاستيراد

// Pages
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import UserBooksPage from './pages/UserBooksPage';
import UserAccounts from './pages/UserAccounts';
import StatisticsPage from './pages/StatisticsPage';

// Layout Components (For Users)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Layout Components (New Admin Sidebar)
import { SideBar } from "./components/admin/SideBar"; 
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userRole, setUserRole] = useState("member"); 

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };
console.log(userRole);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("member");
  };

  return (
    <ThemeProvider>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : userRole === 'admin' ? (
          <SidebarProvider>
            <SideBar onLogout={handleLogout}/>

            <SidebarInset>  
                  <Routes>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/stats" element={<StatisticsPage />} />
                    <Route path="/admin/users" element={<UserAccounts />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                  </Routes>  
            </SidebarInset>
          </SidebarProvider>
        ) : (
          <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
            <Navbar onLogout={handleLogout} />

            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/my-books" element={<UserBooksPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
          </div>
        )}
      </Router>
    </ThemeProvider>
  );
};