import Cookies from "js-cookie";
import type { AuthResponse, User } from "../types";
import { api } from "../utils";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}

interface ChangePasswordPayload {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const data = await api.post<AuthResponse>("/auth/login", payload);

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

export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  await api.post("/auth/change-password", payload);
};
