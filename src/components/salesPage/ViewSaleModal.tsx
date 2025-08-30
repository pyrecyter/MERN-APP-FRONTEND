import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { Sale } from "../../types";

interface ViewSaleModalProps {
  open: boolean;
  onClose: () => void;
  sale: Sale;
}

export const ViewSaleModal = ({ open, onClose, sale }: ViewSaleModalProps) => {
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
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Sale Details
        </Typography>
        <Typography variant="body1">
          <strong>Customer:</strong> {sale.customerName}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {sale.address}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Total Price:</strong> ${sale.totalPrice.toFixed(2)}
        </Typography>
        <Typography variant="h6">Items</Typography>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sale.items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.productUnitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.productUnitPrice).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
