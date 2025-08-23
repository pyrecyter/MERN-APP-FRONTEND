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
  const [selecteCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { setCategories } = useCategories();
  const { showMessage } = useSnackbar();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (product: Category) => {
    setSelectedCategory(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (product: Category) => {
    setSelectedCategory(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selecteCategory) {
        await deleteCategory(selecteCategory?._id);
        setCategories((prev) =>
          prev.filter((c) => c._id !== selecteCategory?._id)
        );
        setSelectedCategory(null);
        showMessage("Category deleted", "success");
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
          <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
            Add Category
          </Button>
        </Box>
        <CategoryTable onEdit={handleEditClick} onDelete={handleDeleteClick} />
        {isAddModalOpen && (
          <AddCategoryModal onClose={() => setIsAddModalOpen(false)} />
        )}
        {selecteCategory && (
          <EditCategoryModal
            open={editModalOpen}
            category={selecteCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
        {selecteCategory && (
          <DeleteConfirmModal
            open={deleteModalOpen}
            onClose={() => setSelectedCategory(null)}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete category ${selecteCategory?.name}?`}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ManageCategoriesModal;
