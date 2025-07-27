import { useState } from "react";
import { CategoryProvider } from "../providers/CategoryProvider";
import ManageCategoriesModal from "../components/manageCategoriesPage/ManageCategoriesModal";
import { Box, Button } from "@mui/material";

const ProductsPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Products</h1>
        <Button variant="contained" onClick={handleOpenModal}>
          Manage Categories
        </Button>
      </Box>
      <ManageCategoriesModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

const ProductsPage = () => {
  return (
    <CategoryProvider>
      <ProductsPageContent />
    </CategoryProvider>
  );
};

export default ProductsPage;
