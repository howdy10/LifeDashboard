import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { CardInfoRowMoney } from "../dataDisplay/card-infoRow";
import { MonthName } from "../dataDisplay/date-util";

export const BudgetSummary = ({
  //   spentAmount,
  //   creditCardAmount,
  //   incomeAmount,
  month,
  year,
  isCurrentMonth,
  isLastMonth,
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            {MonthName(month) + " " + year}
          </Typography>
        </Grid>
        {/* {(isLastMonth || isCurrentMonth) && (
          <Grid item>
            <CurrentModal
              spent={spentAmount}
              creditCard={creditCardAmount}
              month={month}
              year={year}
              isCurrentMonth={isCurrentMonth}
            />
          </Grid>
        )} */}
      </Grid>
      <Divider />
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container>
          <CardInfoRowMoney title={"Income Planned"} value={12} />
          <CardInfoRowMoney title={"Spent"} value={12} />
          <CardInfoRowMoney title={"Remaining"} value={12} />
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
