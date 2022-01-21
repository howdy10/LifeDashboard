import { getAuth } from "firebase/auth";

export const CarLoanUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user?.uid + "/Loans/0";
};
export const CarLoanTransactionUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user.uid + "/Loans/0/transactions";
};

export const InsuranceUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user?.uid + "/HealthInsurance";
};

export const InsuranceMembersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user?.uid + "/HealthInsurance/members";
};
export const InsuranceProvidersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user?.uid + "/HealthInsurance/providers";
};

export const InsuranceClaimsUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "users/" + user.uid + "/HealthInsurance/claims";
};
