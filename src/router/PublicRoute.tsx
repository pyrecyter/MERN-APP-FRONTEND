import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services";
import type { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  return !isAuthenticated() ? children : <Navigate to="/" />;
};

export default PublicRoute;
