import React, { useState } from "react";
import { UserTable, AddUserModal } from "../components";
import { Button, Box } from "@mui/material";

const ManageUsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Manage Users</h1>
        <Button variant="contained" onClick={handleOpenModal}>
          Add User
        </Button>
      </Box>
      <UserTable />
      <AddUserModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default ManageUsersPage;
