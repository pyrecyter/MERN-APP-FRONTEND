import { api } from "../utils";
import type { User } from "../types";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface UpdateUserPayload {
  name: string;
  email: string;
  role: string;
}

export const getUsers = async (): Promise<User[]> => {
  return api.get<User[]>("/users");
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  return api.post<User>("/users", payload);
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete<void>(`/users/${userId}`);
};

export const updateUser = async (userId: string, payload: UpdateUserPayload): Promise<User> => {
  return api.patch<User>(`/users/${userId}`, payload);
};
