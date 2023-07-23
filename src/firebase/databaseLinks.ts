import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export const GetFamilyId = () => {
  return useAppSelector(selectFamilyBaseUrl);
};

export const DashboardUrl = (base: boolean = true) => {
  let url = `/Dashboard`;
  return base ? GetFamilyId() + url : url;
};

export const EmergencyBucketUrl = (base: boolean = true) => {
  let url = `/Savings/emergencyFund`;
  return base ? GetFamilyId() + url : url;
};

export const BucketsUrl = (base: boolean = true) => {
  let url = `/Savings/buckets`;
  return base ? GetFamilyId() + url : url;
};

export const SavingsUrl = (base: boolean = true) => {
  let url = `/Savings`;
  return base ? GetFamilyId() + url : url;
};

export const SavingsTransactionsUrl = (base: boolean = true) => {
  let url = `/Savings/transactions`;
  return base ? GetFamilyId() + url : url;
};

export const AllLoansUrl = (base: boolean = true) => {
  let url = `/Loans`;
  return base ? GetFamilyId() + url : url;
};

export const BudgetUrl = (base: boolean = true) => {
  let url = `/Balance`;
  return base ? GetFamilyId() + url : url;
};

export const InsuranceUrl = (year: number, base: boolean = true) => {
  let url = `/HealthInsurance/${year}`;
  return base ? GetFamilyId() + url : url;
};

export const HsaTransactionsUrl = (year: number, base: boolean = true) => {
  let url = `/hsa/${year}`;
  return base ? GetFamilyId() + url : url;
};

export const HsaCategoryUrl = (base: boolean = true) => {
  let url = `/hsa/categories`;
  return base ? GetFamilyId() + url : url;
};

export const InsuranceMembersUrl = (base: boolean = true) => {
  let url = `/HealthInsurance/members`;
  return base ? GetFamilyId() + url : url;
};

export const InsuranceProvidersUrl = (year: number, base: boolean = true) => {
  let url = `/HealthInsurance/${year}/providers`;
  return base ? GetFamilyId() + url : url;
};

export const InsuranceClaimsUrl = (year: number, base: boolean = true) => {
  let url = `/HealthInsurance/${year}/claims`;
  return base ? GetFamilyId() + url : url;
};
