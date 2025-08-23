import React, { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types";
import { updateCategory } from "../../services";
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

interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
  open: boolean;
}

const EditCategoryModal = ({
  category,
  onClose,
  open,
}: EditCategoryModalProps) => {
  const [name, setName] = useState(category.name);
  const { setCategories } = useCategories();
  const { showMessage } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedCategory = await updateCategory(category._id, name);
      setCategories((prev) =>
        prev.map((c) => (c._id === category._id ? updatedCategory : c))
      );
      showMessage("Category updated", "success");
      onClose();
    } catch (err: unknown) {
      showMessage(
        (err as Error).message || "Failed to update category.",
        "error"
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-category-modal-title"
      aria-describedby="edit-category-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="edit-category-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Edit Category
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
            Update
          </Button>
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
