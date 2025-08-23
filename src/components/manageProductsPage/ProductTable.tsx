import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { Product } from "../../types";
import {
  EditProductModal,
  DeleteConfirmModal,
  StyledTableCell,
  StyledTableRow,
} from "../";
import { useProducts, useSnackbar } from "../../hooks";
import { deleteProduct } from "../../services";

interface ProductTableProps {
  search?: string;
}

export const ProductTable = ({ search }: ProductTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, setProducts } = useProducts();
  const { showMessage } = useSnackbar();

  const filteredProducts = search
    ? products.filter((prod) =>
        prod.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : products;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id);
        setProducts((prev) =>
          prev.filter((c) => c._id !== selectedProduct?._id)
        );
        setSelectedProduct(null);
        showMessage("Product deleted", "success");
      } catch (err: unknown) {
        showMessage(
          (err as Error).message || "Failed to delete product.",
          "error"
        );
      }
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Unit Price</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <StyledTableRow key={product._id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEditClick(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(product)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedProduct}
        />
      )}
      {selectedProduct && (
        <DeleteConfirmModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete product ${selectedProduct.name}`}
        />
      )}
    </Box>
  );
};
