import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { LinearProgressWithLabel } from "../dataDisplay/linearProgressWithLabel";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const BudgetCategory = ({ selectdBudget, ...rest }) => (
  <Card>
    {/* <CardHeader title="Payments" /> */}
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
    <Grid container spaceing={2} p={2}>
      {selectdBudget.transactions &&
        Object.keys(selectdBudget.categories).map((id, index) => (
          <Box sx={{ width: "100%", padding: 1 }}>
            <Grid item xs={12} container>
              <Grid item xs={8}>
                <Typography sx={{ padding: 1 }}>{selectdBudget.categories[id].name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ padding: 1, textAlign: "right" }}>
                  {MoneyFormatter(selectdBudget.categories[id].budgetAmount)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ padding: 1, textAlign: "right" }}>
                  {MoneyFormatter(selectdBudget.categories[id].budgetAmount)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgressWithLabel
                  current={50}
                  goal={selectdBudget.categories[id].budgetAmount}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
    </Grid>
  </Card>
);
