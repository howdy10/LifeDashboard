import { useMemo, useContext } from "react";

import AppContext from "src/context/AppContext";

export const GetFamilyId = () => {
  const value = useContext(AppContext);

  return value.state.familyIdBaseUrl;
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
export const CarLoanUrl = () => {
  return GetFamilyId() + "/Loans/0";
};

export const CarLoanTransactionUrl = () => {
  return GetFamilyId() + "/Loans/0/transactions";
};

export const HomeLoanUrl = () => {
  return GetFamilyId() + "/Loans/1";
};

export const HomeLoanTransactionUrl = () => {
  return GetFamilyId() + "/Loans/1/transactions";
};

export const InsuranceUrl = () => {
  return GetFamilyId() + "/HealthInsurance";
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
