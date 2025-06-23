// src/hooks/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../../../api/apiLogin";  // Cập nhật đúng đường dẫn API nếu cần
import {  getUserInfo } from "../../../api/apiLoginusename";
interface User {
  full_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const userData = await getUserInfo(token);
      setUser(userData);
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { access_token } = await loginUser(username, password);
      localStorage.setItem("access_token", access_token);
      setIsLoggedIn(true);
      await fetchUserData(access_token);
    } catch (err) {
      setError("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
