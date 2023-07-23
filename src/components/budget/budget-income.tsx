import { DashboardTable } from "../dashboadTable/dashboardTable";
import { Box, Card, Grid, Typography } from "@mui/material";

const columns = [
  { title: "Name", field: "name" },
  { title: "Planned", field: "planned", type: "currency" },
  { title: "Earned", field: "earned", type: "nullCurrency" },
];

const testIncome = [
  { name: "First of the month", planned: 3130 },
  { name: "mid month", planned: 3130 },
];

export const BudgetIncome = ({ ...rest }) => (
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
        Income
      </Typography>
    </Box>

    <DashboardTable
      columns={columns}
      data={testIncome}
      // rowEdits={handleUpdateRow}
      // rowDelete={handleDeleteRow}
    />
  </Card>
);
