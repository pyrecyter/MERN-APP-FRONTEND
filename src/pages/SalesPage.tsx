import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const SalesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Sales
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesPage;
