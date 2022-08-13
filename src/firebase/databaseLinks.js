import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export const GetFamilyId = () => {
  return useAppSelector(selectFamilyBaseUrl);
};

export const DashboardUrl = () => {
  return GetFamilyId() + "/Dashboard";
};

export const EmergencyBucketUrl = () => {
  return GetFamilyId() + "/Savings/emergencyFund";
};

export const BucketsUrl = () => {
  return GetFamilyId() + "/Savings/buckets";
};

export const SavingsUrl = () => {
  return GetFamilyId() + "/Savings";
};

export const SavingsTransactionsUrl = () => {
  return GetFamilyId() + "/Savings/transactions";
};

export const AllLoansUrl = () => {
  return GetFamilyId() + "/Loans";
};

export const BudgetUrl = () => {
  return GetFamilyId() + "/Budget";
};

export const InsuranceUrl = () => {
  return GetFamilyId() + "/HealthInsurance";
};

export const HsaTransactionsUrl = () => {
  return GetFamilyId() + "/hsa/transactions";
};

export const HsaCategoryUrl = () => {
  return GetFamilyId() + "/hsa/categories";
};

export const InsuranceMembersUrl = () => {
  return GetFamilyId() + "/HealthInsurance/members";
};

export const InsuranceProvidersUrl = () => {
  return GetFamilyId() + "/HealthInsurance/providers";
};

export const InsuranceClaimsUrl = () => {
  return GetFamilyId() + "/HealthInsurance/claims";
};

export const BudgetUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/Budget";
};
