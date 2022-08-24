import { Box, Container, Grid } from "@mui/material";
import { LoadingComponent } from "../loading-component";
import { BudgetCategory } from "./budget-category";
import { BudgetSummary } from "./budget-summary";

export const BudgetBoard = ({ month, year }: { month?: number; year?: number }) => {
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const isLastMonth = lastMonth.getMonth() === month && lastMonth.getFullYear() === year;
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <BudgetSummary
              month={month}
              year={year}
              isCurrentMonth={isCurrentMonth}
              isLastMonth={isLastMonth}
            />
            {/* <BalanceCurrent
                spentAmount={balance?.spent}
                creditCardAmount={balance?.creditCard}
                incomeAmount={balance.total}
                month={month}
                year={year}
                isCurrentMonth={isCurrentMonth}
                isLastMonth={isLastMonth}
              /> */}
          </Grid>

          <Grid item xs={12}>
            <BudgetCategory />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
