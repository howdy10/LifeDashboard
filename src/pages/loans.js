import { DashboardLayout } from "src/components/dashboard-layout";

export const Loans = () => {
  return "list of loans";
};

Loans.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loans;
