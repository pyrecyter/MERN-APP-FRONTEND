import { useUser } from "./useUser";
import { rolePermissions } from "../types";

export const usePermissions = (permission: string) => {
  const { user } = useUser();

  if (!user) {
    return false;
  }

  const userPermissions = rolePermissions[user.role];

  return userPermissions?.includes(permission) ?? false;
};
