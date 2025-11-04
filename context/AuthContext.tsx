import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

// This is a temporary in-memory store for users. In a real app, this would be a database.
const usersStore: User[] = [...mockUsers];

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in local storage
    setTimeout(() => {
      try {
        const storedUser = localStorage.getItem('gympro_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('gympro_user');
      }
      setLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
        // Check the user's actual password instead of a hardcoded one.
        if (foundUser && foundUser.password === pass) {
          setUser(foundUser);
          localStorage.setItem('gympro_user', JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials. Please try again.'));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, pass: string, role: UserRole): Promise<void> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
        if(existingUser) {
            return reject(new Error('An account with this email already exists.'));
        }

        const newUser: User = { 
            id: String(Date.now()), 
            name, 
            email, 
            role: role,
            password: pass, // Save the password
        };
        usersStore.push(newUser); // Add to our in-memory store
        setUser(newUser);
        localStorage.setItem('gympro_user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gympro_user');
    // We don't need a hard redirect anymore, routing will handle it.
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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