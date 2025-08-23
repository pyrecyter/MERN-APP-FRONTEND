import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTableCell, StyledTableRow } from "../";

interface CategoryTableProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable = ({ onEdit, onDelete }: CategoryTableProps) => {
  const { categories } = useCategories();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="category table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontWeight: "bold" }}>Name</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }} align="right">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <StyledTableRow
              key={category._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(category)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
