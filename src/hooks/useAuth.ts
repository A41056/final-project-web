import { useMutation } from "react-query";
import { useAuthStore } from "@/stores/authStore";
import { UserInfo } from "@/types/user";

interface LoginResponse {
  token: string;
  user: UserInfo;
}

const USER_API_URL = import.meta.env.USER_API_URL || "http://localhost:6006";

// Hàm fetchWithAuth từ api.ts
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
  const { login, logout } = useAuthStore();

  // Sử dụng useMutation cho login
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetchWithAuth(`${USER_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ Email: email, Password: password }),
      }) as Promise<LoginResponse>,
    onSuccess: (response) => {
      const { token, user } = response;
      login(token, user); // Lưu token và user vào store
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "An unknown error occurred during login";
      throw new Error(errorMessage);
    },
  });

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    await loginMutation.mutateAsync(credentials);
    return {
      token: loginMutation.data?.token,
      user: loginMutation.data?.user,
    } as LoginResponse;
  };

  return {
    login: loginUser,
    logout,
  };
};
