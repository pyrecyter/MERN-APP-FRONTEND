import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useProducts, useSnackbar } from "../hooks";
import { AdjustStockModal, ProductCard } from "../components";
import type { Product } from "../types";

const ProductsPage = () => {
  const { products, setProducts } = useProducts();
  const [adjustStockModalOpen, setAdjustStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { showMessage } = useSnackbar();

  const handleOpenAdjustStockModal = (product: Product) => {
    setSelectedProduct(product);
    setAdjustStockModalOpen(true);
  };

  const handleCloseAdjustStockModal = () => {
    setAdjustStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStockUpdated = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    );
    showMessage("Stock updated successfully", "success");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id}>
            <ProductCard
              product={product}
              onAdjustStock={handleOpenAdjustStockModal}
            />
          </Grid>
        ))}
      </Grid>
      {selectedProduct && (
        <AdjustStockModal
          open={adjustStockModalOpen}
          onClose={handleCloseAdjustStockModal}
          product={selectedProduct}
          onStockUpdated={handleStockUpdated}
        />
      )}
    </Box>
  );
};

export default ProductsPage;
