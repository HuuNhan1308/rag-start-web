import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getToken, setToken as saveToken, removeToken, isAuthenticated as checkAuth } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      setToken(existingToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string) => {
    saveToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
