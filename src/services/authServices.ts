import api from "@/config/api";
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";

export const login = async ({
  email,
  password,
}: LoginCredentials): Promise<{ token: string; user: User }> => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const register = async ({
  email,
  password,
}: RegisterCredentials): Promise<void> => {
  await api.post("/register", { email, password });
};
