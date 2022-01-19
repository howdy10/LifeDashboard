import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";

export const CarloanBalances = ({ remaning, initial }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Balances
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
          Initial Balance{": "}
          {initial.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          <br />
          Remaining Balance{": "}
          {remaning.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
