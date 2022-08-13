import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

import { DashboardContainer } from "../components/dashboard-container";
import { DateSelector } from "../components/shared/date-selector";
import { BudgetBoard } from "../components/budget/budget-board";

export const Budget = () => {
  return (
    <DashboardContainer title={"Budget"}>
      <DateSelector>
        <BudgetBoard />
      </DateSelector>
    </DashboardContainer>
  );
};
Budget.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Budget;
