import React, { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { addCategory } from "../../services";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from "../../hooks";

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

const AddCategoryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState("");
  const { setCategories } = useCategories();
  const { showMessage } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCategory = await addCategory(name);
      setCategories((prev) => [...prev, newCategory]);
      onClose();
    } catch (err: unknown) {
      showMessage((err as Error).message || "Failed to add category.", "error");
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="add-category-modal-title"
      aria-describedby="add-category-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="add-category-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Add Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
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
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
