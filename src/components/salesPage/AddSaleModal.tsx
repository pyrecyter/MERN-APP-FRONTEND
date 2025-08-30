/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  Grid,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import type { Sale } from "../../types";
import { createSale } from "../../services";
import { useProducts, useSnackbar } from "../../hooks";

interface AddSaleModalProps {
  open: boolean;
  onClose: () => void;
  onSaleAdded: (newSale: Sale) => void;
}

export const AddSaleModal = ({
  open,
  onClose,
  onSaleAdded,
}: AddSaleModalProps) => {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const { products } = useProducts();
  const { showMessage } = useSnackbar();

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      const newSale = await createSale({
        customerName,
        address,
        items,
      });
      onSaleAdded(newSale);
      showMessage("Sale added successfully", "success");
      onClose();
    } catch (err: unknown) {
      showMessage((err as Error).message || "Failed to add sale.", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add Sale
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Customer Name"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Autocomplete
                options={products}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) =>
                  handleItemChange(index, "productId", value?._id)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Product" />
                )}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", parseInt(e.target.value))
                }
                sx={{ width: 120, mr: 2 }}
              />
              <IconButton onClick={() => handleRemoveItem(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Grid container alignItems="center" spacing={2}>
            <Grid>
              <Button onClick={handleAddItem} startIcon={<Add />}>
                Add Item
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" onClick={handleSubmit}>
                Create Sale
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
