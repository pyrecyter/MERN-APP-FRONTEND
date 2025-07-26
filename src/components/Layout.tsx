import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "../hooks/useSnackbar";
import { usePermissions } from "../hooks/usePermissions";
import { permissions } from "../types/roles";
import { useState } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { showMessage } = useSnackbar();
  const canManageUsers = usePermissions(permissions.manage_users);
  const canManageProducts = usePermissions(permissions.manage_products);
  const canViewSales = usePermissions(permissions.view_sales);
  const canRecordSale = usePermissions(permissions.record_sale);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    showMessage("Logged out successfully!", "success");
    navigate("/login");
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Go Shopping
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          </Box>
          <Box sx={{ ml: 2 }}>
            <Avatar
              onClick={handleMenu}
              sx={{ cursor: "pointer", bgcolor: "secondary.main" }}
            >
              {user?.name[0].toUpperCase()}
            </Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/account");
                  handleClose();
                }}
              >
                Account
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};
