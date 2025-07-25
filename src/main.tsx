import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { UserProvider } from "./providers/UserProvider";
import AppLoader from "./components/AppLoader";
import theme from "./theme";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <UserProvider>
          <AppLoader>
            <CssBaseline />
            <RouterProvider router={router} />
          </AppLoader>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
