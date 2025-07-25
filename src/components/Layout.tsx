import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../hooks/useSnackbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { showMessage } = useSnackbar();

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
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
          <Button color="inherit" component={Link} to="/account">
            Account
          </Button>
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
