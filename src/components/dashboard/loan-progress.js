import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HouseIcon from "@mui/icons-material/House";
import { useRouter } from "next/router";
import { GetLoanDetails } from "../../hooks/loan";
import { LoadingComponent } from "../loading-component";

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
        <HouseIcon />
      </Avatar>
    );

    return <IconButton onClick={() => router.push("loans/" + loanId)}> {base}</IconButton>;
  };

  return (
    <LoadingComponent loading={loading} error={error}>
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
    </LoadingComponent>
  );
};
