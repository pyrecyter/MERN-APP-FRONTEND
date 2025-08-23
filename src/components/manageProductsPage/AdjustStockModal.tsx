import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from "../../hooks";
import { updateStock } from "../../services";
import type { Product } from "../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AdjustStockModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onStockUpdated: (updatedProduct: Product) => void;
}

export const AdjustStockModal: React.FC<AdjustStockModalProps> = ({
  open,
  onClose,
  product,
  onStockUpdated,
}) => {
  const [stock, setStock] = useState(product.stock);
  const { showMessage } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateStock(product._id, stock);
      onStockUpdated(updatedProduct);
      onClose();
    } catch (err: unknown) {
      showMessage(
        (err as Error).message || "Failed to update stock.",
        "error"
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Adjust Stock for {product.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Update Stock
            </Button>
            <Button type="button" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};