import { Box, Card, Typography } from "@mui/material";
import { DashboardTable } from "../dashboadTable/dashboardTable";
import { PaycheckModal } from "./balance-paycheckModal";
import { payChecksDB } from "../../hooks/balance";

const columns = [
  { title: "Date", field: "date", type: "date" },
  { title: "Amount", field: "amount", type: "currency" },
];

const order = {
  column: "date",
  direction: "asc" as const,
};

interface BalancePaychecksInput {
  income: payChecksDB;
  year: number;
  month: number;
  isCurrentMonth: boolean;
  isLastMonth: boolean;
}

export const BalancePaychecks = ({
  income,
  year,
  month,
  isCurrentMonth,
  isLastMonth,
  ...rest
}: BalancePaychecksInput) => {
  return (
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
        {(isLastMonth || isCurrentMonth) && (
          <Box sx={{ m: 1 }}>
            <PaycheckModal year={year} month={month} />
          </Box>
        )}
      </Box>
      <DashboardTable columns={columns} data={income} order={order} />
    </Card>
  );
};
