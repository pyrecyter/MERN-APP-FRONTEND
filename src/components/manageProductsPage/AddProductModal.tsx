import { useState, type FormEvent } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCategories, useSnackbar } from "../../hooks";
import type { Product } from "../../types";
import { addProduct } from "../../services";

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

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const { categories } = useCategories();
  const { showMessage } = useSnackbar();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newProduct: Omit<Product, "_id" | "images"> = {
        name,
        description,
        category,
        unitPrice,
        stock,
      };
      await addProduct(newProduct as Omit<Product, "_id">);
      showMessage("Product added", "success");
      onClose();
    } catch (err: unknown) {
      showMessage((err as Error).message || "Failed to add product.", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Unit Price"
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
          />
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
              Add
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
