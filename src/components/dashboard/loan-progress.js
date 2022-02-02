import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export const LoanProgress = ({ loan, props }) => {
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {loan.title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loan.percent}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <DirectionsCarIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={loan.percent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
