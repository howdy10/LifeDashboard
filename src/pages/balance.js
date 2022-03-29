import { DashboardLayout } from "../components/dashboard-layout";
import { BalanceBoard } from "src/components/balance/balance-board";
import { DashboardContainer } from "src/components/dashboard-container";

export const Balance = () => {
  const today = new Date();

  return (
    <DashboardContainer title={"Balance"}>
      <BalanceBoard month={today.getMonth()} year={today.getFullYear()} />
    </DashboardContainer>
  );
};
Balance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Balance;
