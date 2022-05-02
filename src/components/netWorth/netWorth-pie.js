import { Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import { MoneyFormatter } from "src/components/dataDisplay/numberFormatter";
import { Doughnut } from "react-chartjs-2";

export const NetWorthPie = ({ categoryMap, netWorthAmount }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={7}>
            <Typography color="textPrimary" variant="h5">
              Total NetWorth
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textPrimary" variant="h5" align="right">
              {MoneyFormatter(netWorthAmount)}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {categoryMap && (
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
