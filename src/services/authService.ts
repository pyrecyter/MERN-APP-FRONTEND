import Cookies from "js-cookie";
import type { AuthResponse, User } from "../types";
import { api } from "../utils";

export const login = async (
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string; user?: User }> => {
  try {
    const data = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    Cookies.set("token", data.token, { expires: 7 });
    return { success: true, user: data.user };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      success: false,
      message:
        (error as Error).message || "Network error or server is unreachable",
    };
  }
};

export const logout = () => {
  Cookies.remove("token");
};

export const isAuthenticated = () => {
  return !!Cookies.get("token");
};

export const fetchUser = async (): Promise<User | null> => {
  try {
    const user = await api.get<User>("/auth/me");
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    logout();
    return null;
  }
};

export const changePassword = async (
  password: string,
  newPassword: string,
  confirmPassword: string,
): Promise<void> => {
  await api.post("/auth/change-password", { password, newPassword, confirmPassword });
};
