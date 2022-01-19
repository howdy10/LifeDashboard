import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletIcon from "@mui/icons-material/Tablet";
import { set } from "nprogress";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={170} variant="determinate" color="success" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export const CarloanPercent = ({ remaning, initial }) => {
  const theme = useTheme();
  const [paidPercent, setPaidPercent] = useState(0);

  useEffect(() => {
    setPaidPercent(Math.trunc(((initial - remaning) / initial) * 100));
    console.log(paidPercent);
  }, [remaning, initial]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h4">
              Percent Paid
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgressWithLabel value={paidPercent} />
        </Box>
      </CardContent>
    </Card>
  );
};
