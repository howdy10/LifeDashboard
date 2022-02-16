import { useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";

export const SavingsBoard = ({ savingsTotal, goalTotal }) => {
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
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Goal: {MoneyFormatter(goalTotal)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
