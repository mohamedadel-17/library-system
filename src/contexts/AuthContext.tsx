import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    userRole: string | null;
    login: (token: string, userId: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getLocalAuth = () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    return { token, userId, userRole };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    // التحقق عند تحميل التطبيق
    useEffect(() => {
        const { token, userId: storedId, userRole: storedRole } = getLocalAuth();
        if (token && storedId && storedRole) {
            setIsAuthenticated(true);
            setUserId(storedId);
            setUserRole(storedRole);
        }
    }, []);

    const login = (token: string, id: string, role: string) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserId(id);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};