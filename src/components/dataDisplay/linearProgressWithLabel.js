import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { MoneyFormatter } from "./numberFormatter";

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
            {MoneyFormatter(props.current)}
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "100%", mr: 1, ml: 1 }}>
        <LinearProgress variant="determinate" value={(props.current / props.goal) * 100} />
      </Box>
      {props.showGoalLabel && (
        <Box data-testid="goal-label" sx={{ width: "8%" }}>
          <Typography data-testid="goal-label-text" variant="body2" color="text.secondary">
            {MoneyFormatter(props.goal)}
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
  current: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  showCurrentLabel: PropTypes.bool,
  showGoalLabel: PropTypes.bool,
};
