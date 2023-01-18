import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { LoadingComponent } from "../components/loading-component";
import { GetHsaInfo } from "../hooks/hsa";
import { HsaBoard } from "../components/hsa/hsa-board";
import { subYears, getYear, addYears } from "date-fns";
import { DashboardContainer } from "../components/dashboard-container";

export const Hsa = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [snapshot, loading, error] = GetHsaInfo(selectedYear);

  const handlePreviousYear = () => {
    let changeDate = subYears(selectedDate, 1);
    setSelectedDate(changeDate);
    setSelectedYear(getYear(changeDate));
  };

  const handleNextYear = () => {
    let changeDate = addYears(selectedDate, 1);
    setSelectedDate(changeDate);
    setSelectedYear(getYear(changeDate));
  };

  return (
    <DashboardContainer title={"HSA"}>
      <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handlePreviousYear}
          sx={{ mr: 1 }}
          disabled={2022 === selectedYear}
        >
          Previous
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNextYear}
          sx={{ mr: 1 }}
          disabled={getYear(today) === selectedYear}
        >
          Next
        </Button>
      </Box>
      <LoadingComponent loading={loading} error={error}>
        <HsaBoard hsaInfo={snapshot} year={selectedYear} />
      </LoadingComponent>
    </DashboardContainer>
  );
};
Hsa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Hsa;
