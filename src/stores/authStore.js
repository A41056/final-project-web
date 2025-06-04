import { create } from "zustand";
export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
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
        set({ isAuthenticated: true, token, refreshToken });
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
