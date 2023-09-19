import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { InsuranceClaims } from "../components/insurance/insurance-claims";
import { InsuranceBoard } from "../components/insurance/insurance-board";
import { DashboardContainer } from "../components/dashboard-container";
import { GetInsuranceInfo } from "../hooks/insurance";
import { subYears, getYear, addYears } from "date-fns";
import { LoadingComponent } from "../components/loading-component";

export const Insurance = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [snapshot, loading, error] = GetInsuranceInfo(selectedYear);

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
    <DashboardContainer title={"Insurance"}>
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
        {snapshot !== undefined ? (
          <InsuranceBoard insurance={snapshot} year={selectedYear} />
        ) : (
          <div></div>
        )}
        <Box sx={{ mt: 3 }}>
          {snapshot && <InsuranceClaims claims={snapshot.claims} year={selectedYear} />}
        </Box>
      </LoadingComponent>
    </DashboardContainer>
  );
};
Insurance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Insurance;
