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

interface CategoryTableProps {
  setEditCategory: (category: Category) => void;
  setDeleteCategory: (category: Category) => void;
}

const CategoryTable = ({
  setDeleteCategory,
  setEditCategory,
}: CategoryTableProps) => {
  const { categories } = useCategories();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="category table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setEditCategory(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setDeleteCategory(category)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
