import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { changePassword } from "../../services";
import { useSnackbar } from "../../hooks";

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = ({ open, onClose }: PasswordResetModalProps) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showMessage } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showMessage("New password and confirm password do not match.", "error");
      return;
    }

    try {
      await changePassword({ password, newPassword, confirmPassword });
      showMessage("Password changed successfully!", "success");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (err: unknown) {
      showMessage(
        (err as Error).message || "Failed to change password.",
        "error"
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
