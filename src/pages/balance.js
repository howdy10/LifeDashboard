import { DashboardLayout } from "../components/dashboard-layout";
import { BalanceBoard } from "src/components/balance/balance-board";
import { DashboardContainer } from "src/components/dashboard-container";

export const Balance = () => {
  const SelectedDate = new Date();

  return (
    <DashboardContainer title={"Balance"}>
      <BalanceBoard month={SelectedDate.getMonth()} year={SelectedDate.getFullYear()} />
    </DashboardContainer>
  );
};
Balance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Balance;
