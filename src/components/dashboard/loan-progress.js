import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { GetLoanDetails } from "src/hooks/loan";

export const LoanProgress = ({ loanId, ...props }) => {
  const router = useRouter();

  const [loan, loading, error] = GetLoanDetails(loanId);

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

    return <IconButton onClick={() => router.push("loans/" + loanId)}> {base}</IconButton>;
  };

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {loan.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loan.percentPaid}%
            </Typography>
          </Grid>
          <Grid item>{Icon()}</Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={loan.percentPaid} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
