import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { GetInsurancePaid } from "src/hooks/insurance";
import { LoadingComponent } from "../loading-component";

export const InsuranceProgress = ({ href, props }) => {
  const router = useRouter();

  const [paid, loading, error] = GetInsurancePaid();
  const Icon = () => {
    let base = (
      <Avatar
        sx={{
          backgroundColor: "info.main",
          height: 56,
          width: 56,
        }}
      >
        <LocalHospitalIcon />
      </Avatar>
    );

    if (href) {
      return <IconButton onClick={() => router.push(href)}> {base}</IconButton>;
    } else {
      return base;
    }
  };

  return (
    <LoadingComponent loading={loading} error={error}>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Insurance Deductible
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {paid?.percentPaid}%
              </Typography>
            </Grid>
            <Grid item>{Icon()}</Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <LinearProgress value={paid?.percentPaid} variant="determinate" />
          </Box>
        </CardContent>
      </Card>
    </LoadingComponent>
  );
};
