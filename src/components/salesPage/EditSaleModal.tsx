/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
import { updateSale } from "../../services";
import { useProducts, useSnackbar } from "../../hooks";

interface EditSaleModalProps {
  open: boolean;
  onClose: () => void;
  sale: Sale;
  onSaleUpdated: (updatedSale: Sale) => void;
}

export const EditSaleModal = ({
  open,
  onClose,
  sale,
  onSaleUpdated,
}: EditSaleModalProps) => {
  const [customerName, setCustomerName] = useState(sale.customerName);
  const [address, setAddress] = useState(sale.address || "");
  const [items, setItems] = useState(sale.items);
  const { showMessage } = useSnackbar();
  const { products } = useProducts();

  useEffect(() => {
    setCustomerName(sale.customerName);
    setAddress(sale.address || "");
    setItems(sale.items);
  }, [sale]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { productId: "", quantity: 1, productName: "", productUnitPrice: 0 },
    ]);
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
      const updatedSale = await updateSale(sale._id, {
        customerName,
        address,
        items,
      });
      onSaleUpdated(updatedSale);
      showMessage("Sale updated successfully", "success");
      onClose();
    } catch (err: unknown) {
      showMessage((err as Error).message || "Failed to update sale.", "error");
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
          Edit Sale
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
                value={products.find((p) => p._id === item.productId) || null}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
