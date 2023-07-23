import { DashboardLayout } from "../components/dashboard-layout";
import { BalanceBoard } from "../components/balance/balance-board";
import { DashboardContainer } from "../components/dashboard-container";
import { DateSelector } from "../components/shared/date-selector";

export const Balance = () => {
  return (
    <DashboardContainer title={"Balance"}>
      <DateSelector
        firstMonth={0}
        firstYear={2022}
        renderItem={(m: number, y: number) => <BalanceBoard month={m} year={y} />}
      ></DateSelector>
    </DashboardContainer>
  );
};
Balance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Balance;
