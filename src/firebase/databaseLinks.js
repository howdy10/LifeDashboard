import { getAuth } from "firebase/auth";

const familyId = "a70b3195-4787-4509-8d08-cfeb49761524";

export const CarLoanUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/Loans/0";
};

export const CarLoanTransactionUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/Loans/0/transactions";
};

export const InsuranceUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/HealthInsurance";
};

export const InsuranceMembersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/HealthInsurance/members";
};

export const InsuranceProvidersUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/HealthInsurance/providers";
};

export const InsuranceClaimsUrl = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return "family/" + familyId + "/HealthInsurance/claims";
};
