import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import type { Product } from "../../types";
import { useUser } from "../../hooks";

interface ProductCardProps {
  product: Product;
  onAdjustStock: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAdjustStock,
}) => {
  const { user } = useUser();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.images?.[0] || "https://via.placeholder.com/150"}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          ${product.unitPrice.toFixed(2)}
        </Typography>
        <Typography variant="body1">In Stock: {product.stock}</Typography>
      </CardContent>
      {user?.role === "stock_keeper" && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onAdjustStock(product)}
          >
            Adjust Stock
          </Button>
        </Box>
      )}
    </Card>
  );
};
