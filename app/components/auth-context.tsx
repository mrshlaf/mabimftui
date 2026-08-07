"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Mahasiswa } from "@/data/types";

const STORAGE_KEY = "mabim-session";

interface AuthContextValue {
  user: Mahasiswa | null;
  loading: boolean;
  login: (m: Mahasiswa) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw) as Mahasiswa);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const login = useCallback((m: Mahasiswa) => {
    setUser(m);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    } catch {
      // storage penuh / tidak tersedia, abaikan
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // abaikan
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
}
