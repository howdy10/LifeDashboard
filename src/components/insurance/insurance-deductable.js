import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import LinearProgress from "@mui/material/LinearProgress";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "8%" }}>
        <Typography variant="body2" color="text.secondary" align="right">
          {`$` + props.current}
        </Typography>
      </Box>
      <Box sx={{ width: "84%", mr: 1, ml: 1 }}>
        <LinearProgress variant="determinate" value={(props.current / props.goal) * 100} />
      </Box>
      <Box sx={{ width: "8%" }}>
        <Typography variant="body2" color="text.secondary">
          {`$` + props.goal}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export const InsuranceDeductable = ({ paid, deductible, outOfPocket, ...rest }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h5">
            Insurance values
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box>
        <Typography sx={{ mb: 1, mt: 1 }}>Deductible</Typography>
        <LinearProgressWithLabel
          current={paid > deductible ? deductible : paid}
          goal={deductible}
          value={30}
        />
        <Typography sx={{ mb: 1, mt: 1 }}>Out of Pocket Max</Typography>
        <LinearProgressWithLabel
          current={paid > outOfPocket ? outOfPocket : paid}
          goal={outOfPocket}
          value={30}
        />
      </Box>
    </CardContent>
  </Card>
);
