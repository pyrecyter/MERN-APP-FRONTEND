import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { permissions } from "../types";
import App from "../App";

const ProductsPage = React.lazy(() => import("../pages/ProductsPage"));
const AccountPage = React.lazy(() => import("../pages/AccountPage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const ManageUsersPage = React.lazy(() => import("../pages/ManageUsersPage"));
const ManageProductsPage = React.lazy(
  () => import("../pages/ManageProductsPage")
);
const SalesPage = React.lazy(() => import("../pages/SalesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <AccountPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-users",
        element: (
          <PrivateRoute permission={permissions.manage_users}>
            <Suspense fallback={<div>Loading...</div>}>
              <ManageUsersPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-products",
        element: (
          <PrivateRoute permission={permissions.manage_products}>
            <Suspense fallback={<div>Loading...</div>}>
              <ManageProductsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/sales",
        element: (
          <PrivateRoute permission={permissions.view_sales}>
            <Suspense fallback={<div>Loading...</div>}>
              <SalesPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      </PublicRoute>
    ),
  },
]);

export default router;
