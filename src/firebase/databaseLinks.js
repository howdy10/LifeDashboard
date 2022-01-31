import { getAuth } from "firebase/auth";
import { useEffect } from "react";
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

export const CarLoanUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/Loans/0";
};

export const CarLoanTransactionUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/Loans/0/transactions";
};

export const HomeLoanUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/Loans/1";
};

export const HomeLoanTransactionUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/Loans/1/transactions";
};

export const InsuranceUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/HealthInsurance";
};

export const InsuranceMembersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/HealthInsurance/members";
};

export const InsuranceProvidersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/HealthInsurance/providers";
};

export const InsuranceClaimsUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + GetFamilyId() + "/HealthInsurance/claims";
};
