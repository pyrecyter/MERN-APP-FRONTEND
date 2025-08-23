import { useState } from "react";
import { useUser } from "../hooks";
import { Typography, Button, Box } from "@mui/material";
import { UserProfileDisplay, ChangePasswordModal } from "../components";

const AccountPage = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Page
      </Typography>
      {user ? (
        <>
          <UserProfileDisplay user={user} />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleOpenModal}>
              Change Password
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6">No user data available.</Typography>
      )}
      <ChangePasswordModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default AccountPage;
