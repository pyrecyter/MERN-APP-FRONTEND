import { Box, CircularProgress } from "@mui/material";
import { useUser } from "../hooks/useUser";
import type { ReactNode } from "react";

export const AppLoader = ({ children }: { children: ReactNode }) => {
  const { loading } = useUser();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
