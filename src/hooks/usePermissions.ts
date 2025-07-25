import { useUser } from "./useUser";
import { rolePermissions } from "../types/roles";

export const usePermissions = (permission: string) => {
  const { user } = useUser();

  if (!user) {
    return false;
  }

  const userPermissions = rolePermissions[user.role];

  return userPermissions?.includes(permission) ?? false;
};
