import { DashboardLayout } from "../components/dashboard-layout";
import { LoadingComponent } from "src/components/loading-component";
import { GetHsaInfo } from "../hooks/hsa";
import { HsaBoard } from "src/components/hsa/hsa-board";
import { DashboardContainer } from "src/components/dashboard-container";

export const Hsa = () => {
  const [snapshot, loading, error] = GetHsaInfo();

  return (
    <DashboardContainer title={"HSA"}>
      <LoadingComponent loading={loading} error={error}>
        <HsaBoard hsaInfo={snapshot} />
      </LoadingComponent>
    </DashboardContainer>
  );
};
Hsa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Hsa;
