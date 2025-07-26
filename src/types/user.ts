import { roles } from "./roles";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: keyof typeof roles;
}
