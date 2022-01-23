import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

export function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {props.showCurrentLabel && (
        <Box data-testid="current-label" sx={{ width: "8%" }}>
          <Typography
            data-testid="current-label-text"
            variant="body2"
            color="text.secondary"
            align="right"
          >
            {`$` + props.current}
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "84%", mr: 1, ml: 1 }}>
        <LinearProgress variant="determinate" value={(props.current / props.goal) * 100} />
      </Box>
      {props.showGoalLabel && (
        <Box data-testid="goal-label" sx={{ width: "8%" }}>
          <Typography data-testid="goal-label-text" variant="body2" color="text.secondary">
            {`$` + props.goal}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
LinearProgressWithLabel.defaultProps = {
  showCurrentLabel: false,
  showGoalLabel: false,
};
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  current: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  showCurrentLabel: PropTypes.bool,
  showGoalLabel: PropTypes.bool,
};
