import api from "@/config/api";
import { UserInfo, UserUpdate } from "@/types/user";

export const getUserProfile = async (userId: string): Promise<UserInfo> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (data: UserUpdate): Promise<void> => {
  await api.put(`/users/${data.id}`, data);
};

export const getAllUsers = async (): Promise<UserInfo[]> => {
  const response = await api.get("/users");
  return response.data;
};
