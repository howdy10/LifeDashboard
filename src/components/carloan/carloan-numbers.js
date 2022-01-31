import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";

export const CarloanNumbers = ({ totalPaid, principalPaid, interestPaid }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Numbers
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
        <Typography color="textSecondary" variant="caption">
          Total Paid{": "}
          {totalPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Principal Paid{": "}
          {principalPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Interest Paid{": "}
          {interestPaid.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);