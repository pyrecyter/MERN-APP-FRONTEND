import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import type { Sale } from "../../types";
import { deleteSale } from "../../services";
import { StyledTableCell, StyledTableRow, DeleteConfirmModal } from "../";
import { usePermissions, useSnackbar } from "../../hooks";
import { permissions } from "../../types";
import { EditSaleModal } from "./EditSaleModal";
import { ViewSaleModal } from "./ViewSaleModal";

interface SalesTableProps {
  search?: string;
  sales: Sale[];
  fetchSales: () => void;
}

export const SalesTable = ({ search, sales, fetchSales }: SalesTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const canRecordSale = usePermissions(permissions.record_sale);
  const { showMessage } = useSnackbar();

  const handleEditClick = (sale: Sale) => {
    setSelectedSale(sale);
    setEditModalOpen(true);
  };

  const handleViewClick = (sale: Sale) => {
    setSelectedSale(sale);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (sale: Sale) => {
    setSelectedSale(sale);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedSale) {
      try {
        await deleteSale(selectedSale._id);
        setSelectedSale(null);
        setDeleteModalOpen(false);
        showMessage("Sale deleted", "success");
        fetchSales();
      } catch (err: unknown) {
        showMessage(
          (err as Error).message || "Failed to delete sale.",
          "error"
        );
      }
    }
  };

  const filteredSales = search
    ? sales.filter((sale) =>
        sale.customerName.toLowerCase().includes(search.toLowerCase())
      )
    : sales;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sale) => (
                <StyledTableRow key={sale._id}>
                  <TableCell component="th" scope="row">
                    {sale.customerName}
                  </TableCell>
                  <TableCell>{sale.address}</TableCell>
                  <TableCell>
                    {sale.items.map((item) => (
                      <Typography key={item.productId}>
                        {item.productName} (x{item.quantity})
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>{sale.totalPrice}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleViewClick(sale)}>
                      <Visibility />
                    </IconButton>
                    {canRecordSale && (
                      <>
                        <IconButton onClick={() => handleEditClick(sale)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(sale)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredSales.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedSale && (
        <ViewSaleModal
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          sale={selectedSale}
        />
      )}
      {selectedSale && (
        <EditSaleModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          sale={selectedSale}
          onSaleUpdated={() => {
            fetchSales();
          }}
        />
      )}
      {selectedSale && (
        <DeleteConfirmModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete this sale?`}
        />
      )}
    </Box>
  );
};
