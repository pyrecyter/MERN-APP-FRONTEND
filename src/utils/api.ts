/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface RequestOptions extends RequestInit {
  token?: string;
}

async function apiCall<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = Cookies.get("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = "Something went wrong";
    if (errorData.errors && Array.isArray(errorData.errors)) {
      errorMessage = errorData.errors.join(", ");
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiCall<T>(endpoint, { method: "GET", ...options }),
  post: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    apiCall<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),
  patch: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    apiCall<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiCall<T>(endpoint, { method: "DELETE", ...options }),
};
