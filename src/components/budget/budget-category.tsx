import { DashboardTable } from "../dashboadTable/dashboardTable";
import { Box, Card, Grid, Typography } from "@mui/material";

const columns = [
  { title: "Name", field: "name" },
  { title: "Planned", field: "amount", type: "currency" },
  { title: "Spent", field: "amount", type: "currency" },
  { title: "Remaining", field: "amount", type: "currency" },
];

export const BudgetCategory = ({ ...rest }) => (
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
        Category
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
