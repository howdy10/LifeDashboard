import { InsuranceClaimsUrl } from "../firebase/databaseConstants";
import { createListResource, deleteListResource, updateListResource } from "./rest-list-api";

export function createInsuranceClaim(baseUrl: string, claim: any) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return createListResource(Url, claim);
}

export function updateInsuranceClaim(baseUrl: string, claim: any, claimId: any) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return updateListResource(Url, claim, claimId);
}

export function deleteInsuranceClaim(baseUrl: string, claimId: any) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return deleteListResource(Url, claimId);
}
