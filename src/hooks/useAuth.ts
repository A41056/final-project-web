import { useMutation } from "react-query";
import { useAuthStore } from "@/stores/authStore";
import { UserInfo } from "@/types/user";

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserInfo;
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

export const useAuth = () => {
  const { login, logout, setUser, setTokens } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetchWithAuth(`${USER_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ Email: email, Password: password }),
      }) as Promise<LoginResponse>,
    onSuccess: (response) => {
      const { token, refreshToken, user } = response;
      login(token, refreshToken, user);
    },
  });

  const refreshToken = async (refreshToken: string) => {
    const response = await fetchWithAuth(`${USER_API_URL}/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    const { token: newToken, refreshToken: newRefreshToken } = response;

    setTokens(newToken, newRefreshToken);
  };

  const register = async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${USER_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: credentials.email, Password: credentials.password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Registration failed");
    }

    return res.json();
  };

  const loginUser = async (credentials: { email: string; password: string }) => {
    await loginMutation.mutateAsync(credentials);
    return {
      token: loginMutation.data?.token,
      refreshToken: loginMutation.data?.refreshToken,
      user: loginMutation.data?.user,
    } as LoginResponse;
  };

  return {
    login: loginUser,
    logout,
    refreshToken,
    register,
    setTokens,
  };
};