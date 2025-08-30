import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { SalesTable, AddSaleModal, SearchBar } from "../components";
import { usePermissions } from "../hooks/usePermissions";
import type { Sale } from "../types";
import { permissions } from "../types";
import { getSales } from "../services";
import { useSnackbar } from "../hooks";

const SalesPage = () => {
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const canRecordSale = usePermissions(permissions.record_sale);
  const [sales, setSales] = useState<Sale[]>([]);
  const { showMessage } = useSnackbar();
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toLocaleDateString(
      "en-CA"
    );
  });
  const [toDate, setToDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).toLocaleDateString(
      "en-CA"
    );
  });

  const fetchSales = useCallback(async () => {
    try {
      const salesData = await getSales(fromDate, toDate);
      setSales(salesData);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
      showMessage("Failed to fetch sales:", "error");
    }
  }, [fromDate, showMessage, toDate]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid>
          <Typography variant="h4" gutterBottom>
            Sales
          </Typography>
        </Grid>
        <Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid>
              <TextField
                label="From"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid>
              <TextField
                label="To"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid>
              <SearchBar value={search} onChange={(val) => setSearch(val)} />
            </Grid>
            {canRecordSale && (
              <Grid>
                <Button
                  variant="contained"
                  onClick={() => setAddModalOpen(true)}
                >
                  Add
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <SalesTable search={search} sales={sales} fetchSales={fetchSales} />
      <AddSaleModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSaleAdded={fetchSales}
      />
    </Box>
  );
};

export default SalesPage;
