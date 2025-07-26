import { api } from "../utils";
import type { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  return api.get<User[]>("/users");
};
