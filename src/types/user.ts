import { roles } from "./roles";

export interface User {
  name: string;
  email: string;
  role: keyof typeof roles;
}
