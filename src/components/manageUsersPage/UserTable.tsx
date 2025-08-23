import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getUsers, deleteUser } from "../../services";
import type { User } from "../../types";
import { useSnackbar, useUser } from "../../hooks";
import { EditUserModal } from ".";
import { StyledTableCell, StyledTableRow, DeleteConfirmModal } from "../";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const { showMessage } = useSnackbar();
  const { user: currentUser } = useUser();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to fetch users.");
      showMessage((err as Error).message || "Failed to fetch users.", "error");
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete && userToDelete._id) {
      try {
        await deleteUser(userToDelete._id);
        showMessage("User deleted successfully!", "success");
        fetchUsers();
      } catch (err: unknown) {
        showMessage(
          (err as Error).message || "Failed to delete user.",
          "error"
        );
      } finally {
        setOpenDeleteModal(false);
        setUserToDelete(null);
      }
    }
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setOpenEditModal(true);
  };

  const handleUserUpdated = () => {
    fetchUsers();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Name
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Email
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Role
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow
                key={user.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(user)}
                    disabled={currentUser?._id === user._id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <DeleteConfirmModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete user ${userToDelete?.name}?`}
        />
        <EditUserModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          user={userToEdit}
          onUserUpdated={handleUserUpdated}
        />
      </TableContainer>
    </Box>
  );
};

export default UserTable;
