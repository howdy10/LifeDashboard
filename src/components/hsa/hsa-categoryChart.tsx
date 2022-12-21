import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { MoneyFormatter } from "../dataDisplay/numberFormatter";
import { Doughnut } from "react-chartjs-2";

export const HsaCategoryChart = ({ categoryMap, spentAmount }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h4">
              HSA Summary
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={7}>
            <Typography color="textSecondary" variant="subtitle1">
              Spent
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="subtitle1" align="right">
              {MoneyFormatter(spentAmount)}
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
          <Doughnut
            data={{
              labels: Array.from(categoryMap.keys()),
              datasets: [
                {
                  data: Array.from(categoryMap.values()),
                  backgroundColor: [
                    "rgb(184, 0, 0)",
                    "rgb(118, 112, 235)",
                    "rgb(20, 184, 160)",
                    "rgb(226, 192, 68)",
                    "rgb(249, 173, 160)",
                    "rgb(255, 0, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
