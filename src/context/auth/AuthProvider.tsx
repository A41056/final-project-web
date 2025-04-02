import React, { useState, useEffect, ReactNode, useMemo } from "react";
import { AuthState } from "@/types/auth";
import { AuthContext } from "./AuthContext";
import { useMutation } from "react-query";
import { useAuthStore } from "@/stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: any;
}

const USER_API_URL = import.meta.env.USER_API_URL || "http://localhost:6006";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: true,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      fetchWithAuth(`${USER_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ Email: email, Password: password }),
      }) as Promise<LoginResponse>,
    onSuccess: (data) => {
      const { token, user } = data;
      setState({ user, token, isAuthenticated: true, loading: false });
      localStorage.setItem("token", token);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setState((prev) => ({ ...prev, loading: false }));
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: RegisterCredentials) =>
      fetchWithAuth(`${USER_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    onSuccess: () => {
      console.log("Registration successful");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setState((prev) => ({
          ...prev,
          token: storedToken,
          isAuthenticated: true,
        }));
      }
      setState((prev) => ({ ...prev, loading: false }));
    };
    initializeAuth();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    registerMutation.mutate(credentials);
  };

  const handleLogout = () => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    localStorage.removeItem("token");
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
