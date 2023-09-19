import { DashboardLayout } from "../components/dashboard-layout";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import DashboardContainer from "../components/dashboard-container";
import { BehavioralAnswers } from "../components/interview/behavioralAnswer";
import { useState } from "react";
import { about } from "../__mocks__/interview";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Interview = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <DashboardContainer title={"Interview"}>
      <Box sx={{ marginBottom: 2, justifyContent: "normal" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Tell me about yourself" />
              <Tab label="Behavioral Question" />
              <Tab label="Interviewer Questions" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Typography>{about}</Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <BehavioralAnswers />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </DashboardContainer>
  );
};
Interview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Interview;
