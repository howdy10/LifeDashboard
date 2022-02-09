import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export const LoanProgress = ({ loan, href, props }) => {
  const router = useRouter();

  const Icon = () => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: "warning.main",
          height: 56,
          width: 56,
        }}
      >
        <DirectionsCarIcon />
      </Avatar>
    );

    if (href) {
      return <IconButton onClick={() => router.push(href)}> {base}</IconButton>;
    } else {
      return base;
    }
  };

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
          <Grid item>{Icon()}</Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={loan.percent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
