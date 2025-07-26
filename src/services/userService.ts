import { api } from "../utils";
import type { User } from "../types";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const getUsers = async (): Promise<User[]> => {
  return api.get<User[]>("/users");
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  return api.post<User>("/users", payload);
};
