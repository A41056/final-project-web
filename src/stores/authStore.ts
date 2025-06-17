import { UserInfo } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  login: (token: string, refreshToken: string, user: UserInfo) => void;
  logout: () => void;
  setUser: (user: UserInfo) => void;
  setTokens: (token: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,

  login: (token, refreshToken, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({ isAuthenticated: true, token, refreshToken, user });
  },

  setTokens: (token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    set({ isAuthenticated: true, token, refreshToken, user: currentUser });
  },

  logout: () => {
    localStorage.clear();
    set({ isAuthenticated: false, token: null, refreshToken: null, user: null });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));