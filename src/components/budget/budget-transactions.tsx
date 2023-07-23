import { DashboardTable } from "../dashboadTable/dashboardTable";
import { Box, Card, Grid, Typography } from "@mui/material";

const columns = [
  { title: "Date", field: "name" },
  { title: "Name", field: "name" },
  { title: "Spent", field: "amount", type: "currency" },
];

export const BudgetTransactions = ({ ...rest }) => (
  <Card>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: 2,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Transactions
      </Typography>
    </Box>

    <DashboardTable
      columns={columns}
      data={{}}
      // rowEdits={handleUpdateRow}
      // rowDelete={handleDeleteRow}
    />
  </Card>
);
