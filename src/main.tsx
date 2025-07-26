import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider, UserProvider } from "./providers";
import { AppLoader } from "./components";
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
  </React.StrictMode>,
);
