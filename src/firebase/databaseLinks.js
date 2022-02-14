import { useMemo } from "react";
import { getAuth } from "firebase/auth";
import { ref, getDatabase } from "firebase/database";
import { useListKeys } from "react-firebase-hooks/database";
import { firebase } from "./clientApp";

export const GetFamilyId = () => {
  const [keys, loading, error] = GetFamilyBaseUrl();

  return keys ? keys : "";
};

export const GetFamilyBaseUrl = () => {
  const database = getDatabase(firebase);
  const auth = getAuth();
  const user = auth.currentUser;

  const [snapshots, loading, error] = useListKeys(ref(database, "userGroups/" + user?.uid));

  const values = useMemo(() => (snapshots ? "family/" + snapshots[0] : null), [snapshots]);

  const resArray = [values, loading, error];
  return useMemo(() => resArray, resArray);
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
