import { DashboardLayout } from "../components/dashboard-layout";
import { DashboardContainer } from "../components/dashboard-container";
import { DateSelector } from "../components/shared/date-selector";
import { BudgetBoard } from "../components/budget/budget-board";

export const Budget = () => {
  return (
    <DashboardContainer title={"Budget"}>
      <DateSelector
        firstMonth={6}
        firstYear={2023}
        renderItem={(m: number, y: number) => <BudgetBoard month={m} year={y} />}
      ></DateSelector>
    </DashboardContainer>
  );
};
Budget.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Budget;
