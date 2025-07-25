import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import type { ReactNode } from "react";
import { usePermissions } from "../hooks/usePermissions";

const PrivateRoute = ({ children, permission }: { children: ReactNode, permission?: string }) => {
  const hasPermission = usePermissions(permission || "");

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (permission && !hasPermission) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
