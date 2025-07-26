import { createContext } from "react";
import type { User } from "../types";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);
