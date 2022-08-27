import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export interface SavingsBoardInput {
  savingsTotal: number;
  goalTotal: number;
}

export const SavingsBoard = ({ savingsTotal, goalTotal }: SavingsBoardInput) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Savings Total
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {MoneyFormatter(savingsTotal)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography color="textSecondary" variant="caption">
                Goal: {MoneyFormatter(goalTotal)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
