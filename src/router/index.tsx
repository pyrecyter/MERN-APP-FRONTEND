
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import AccountPage from '../pages/AccountPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><HomePage /></PrivateRoute>,
  },
  {
    path: '/products',
    element: <PrivateRoute><ProductsPage /></PrivateRoute>,
  },
  {
    path: '/cart',
    element: <PrivateRoute><CartPage /></PrivateRoute>,
  },
  {
    path: '/account',
    element: <PrivateRoute><AccountPage /></PrivateRoute>,
  },
  {
    path: '/login',
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
]);

export default router;
