import { useState } from "react";
import CategoryTable from "./CategoryTable";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import type { Category } from "../../types";
import { Modal, Box, Typography, Button } from "@mui/material";
import { deleteCategory } from "../../services";
import { useCategories, useSnackbar } from "../../hooks";
import { DeleteConfirmModal } from "..";

interface ManageCategoriesModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManageCategoriesModal = ({
  open,
  onClose,
}: ManageCategoriesModalProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const { setCategories } = useCategories();
  const { showMessage } = useSnackbar();

  const handleConfirmDelete = async () => {
    try {
      if (categoryToDelete) {
        await deleteCategory(categoryToDelete?._id);
        setCategories((prev) =>
          prev.filter((c) => c._id !== categoryToDelete?._id)
        );
        setCategoryToDelete(null);
      }
    } catch (err: unknown) {
      showMessage(
        (err as Error).message || "Failed to delete category.",
        "error"
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            id="manage-categories-modal-title"
            variant="h6"
            component="h2"
          >
            Manage Categories
          </Typography>
          <Button onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
        </Box>
        <CategoryTable
          setEditCategory={setEditCategory}
          setDeleteCategory={setCategoryToDelete}
        />
        {isAddModalOpen && (
          <AddCategoryModal onClose={() => setIsAddModalOpen(false)} />
        )}
        {editCategory && (
          <EditCategoryModal
            category={editCategory}
            onClose={() => setEditCategory(null)}
          />
        )}
        {categoryToDelete && (
          <DeleteConfirmModal
            open={true}
            onClose={() => setCategoryToDelete(null)}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete category ${categoryToDelete?.name}?`}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ManageCategoriesModal;
