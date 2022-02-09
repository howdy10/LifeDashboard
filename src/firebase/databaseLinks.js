import { getAuth } from "firebase/auth";
import { ref, getDatabase } from "firebase/database";
import { useListKeys } from "react-firebase-hooks/database";
import { firebase } from "./clientApp";

export const GetFamilyId = () => {
  const database = getDatabase(firebase);
  const auth = getAuth();
  const user = auth.currentUser;

  const [keys, loading, error] = useListKeys(ref(database, "userGroups/" + user?.uid));

  return keys ? keys[0] : "";
};

export const DashboardUrl = () => {
  return "family/" + GetFamilyId() + "/Dashboard";
};

export const EmergencyBucketUrl = () => {
  return "family/" + GetFamilyId() + "/Savings/emergencyFund";
};

export const BucketsUrl = () => {
  return "family/" + GetFamilyId() + "/Savings/buckets";
};

export const SavingsUrl = () => {
  return "family/" + GetFamilyId() + "/Savings";
};

export const CarLoanUrl = () => {
  return "family/" + GetFamilyId() + "/Loans/0";
};

export const CarLoanTransactionUrl = () => {
  return "family/" + GetFamilyId() + "/Loans/0/transactions";
};

export const HomeLoanUrl = () => {
  return "family/" + GetFamilyId() + "/Loans/1";
};

export const HomeLoanTransactionUrl = () => {
  return "family/" + GetFamilyId() + "/Loans/1/transactions";
};

export const InsuranceUrl = () => {
  return "family/" + GetFamilyId() + "/HealthInsurance";
};

export const InsuranceMembersUrl = () => {
  return "family/" + GetFamilyId() + "/HealthInsurance/members";
};

export const InsuranceProvidersUrl = () => {
  return "family/" + GetFamilyId() + "/HealthInsurance/providers";
};

export const InsuranceClaimsUrl = () => {
  return "family/" + GetFamilyId() + "/HealthInsurance/claims";
};
