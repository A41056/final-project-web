import { userApi } from "@/config/api";
import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";

export const login = async ({
  email,
  password,
}: LoginCredentials): Promise<{ token: string; user: User }> => {
  const response = await userApi.post("/login", { email, password });
  return response.data;
};

export const register = async ({
  email,
  password,
}: RegisterCredentials): Promise<void> => {
  await userApi.post("/register", { email, password });
};
