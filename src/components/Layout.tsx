import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../hooks/useSnackbar";
import { usePermissions } from "../hooks/usePermissions";
import { permissions } from "../types/roles";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { showMessage } = useSnackbar();
  const canManageUsers = usePermissions(permissions.manage_users);
  const canManageProducts = usePermissions(permissions.manage_products);
  const canViewSales = usePermissions(permissions.view_sales);
  const canRecordSale = usePermissions(permissions.record_sale);

  const handleLogout = () => {
    logout();
    setUser(null);
    showMessage("Logged out successfully!", "success");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Go Shopping
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {canManageProducts && (
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
          )}
          {canRecordSale && (
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
          )}
          <Button color="inherit" component={Link} to="/account">
            Account
          </Button>
          {canManageUsers && (
            <Button color="inherit" component={Link} to="/manage-users">
              Manage Users
            </Button>
          )}
          {canViewSales && (
            <Button color="inherit" component={Link} to="/sales">
              Sales
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
