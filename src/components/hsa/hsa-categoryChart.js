import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { MoneyFormatter } from "src/components/dataDisplay/numberFormatter";
import { Doughnut } from "react-chartjs-2";

export const HsaCategoryChart = ({ categoryMap, spentAmount }) => {
  console.log(categoryMap.keys());
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
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(255, 0, 86)",
                    "rgb(255, 205, 0)",
                    "rgb(255, 205, 86)",
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
