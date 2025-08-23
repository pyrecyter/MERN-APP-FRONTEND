import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import {
  ProductTable,
  AddProductModal,
} from "../components/manageProductsPage";
import { ManageCategoriesModal, SearchBar } from "../components";

const ManageProductsPage = () => {
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manageCategoriesModalOpen, setManageCategoriesModalOpen] =
    useState(false);

  const handleOpenModal = () => {
    setManageCategoriesModalOpen(true);
  };

  const handleCloseModal = () => {
    setManageCategoriesModalOpen(false);
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
          <Typography variant="h4" gutterBottom>
            Manage Products
          </Typography>
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid>
            <SearchBar value={search} onChange={(val) => setSearch(val)} />
          </Grid>
          <Grid>
            <Button variant="contained" onClick={handleOpenModal}>
              Manage Categories
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" onClick={() => setAddModalOpen(true)}>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ProductTable search={search} />
      <AddProductModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <ManageCategoriesModal
        open={manageCategoriesModalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default ManageProductsPage;
