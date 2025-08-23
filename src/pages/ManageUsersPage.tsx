import React, { useState } from "react";
import { UserTable, AddUserModal } from "../components";
import { Button, Box, Typography, Grid } from "@mui/material";

const ManageUsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Manage Users
          </Typography>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleOpenModal}>
            Add User
          </Button>
        </Grid>
      </Grid>
      <UserTable />
      <AddUserModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default ManageUsersPage;
