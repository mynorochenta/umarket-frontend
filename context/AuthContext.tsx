"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiPost } from "@/lib/api";
import type { User } from "@/lib/types";

interface LoginResponse {
  token: string;
  usuario: User;
}

interface AuthContextType {
  usuario: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (stored && token) {
      try {
        setUsuario(JSON.parse(stored));
      } catch {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiPost<LoginResponse>("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
