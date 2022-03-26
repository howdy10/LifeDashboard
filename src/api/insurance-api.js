import { InsuranceClaimsUrl } from "../firebase/databaseConstants";
import { createListResource, deleteListResource, updateListResource } from "./rest-list-api";

export function createInsuranceClaim(baseUrl, claim) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return createListResource(Url, claim);
}

export function updateInsuranceClaim(baseUrl, claim, claimId) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return updateListResource(Url, claim, claimId);
}

export function deleteInsuranceClaim(baseUrl, claimId) {
  const Url = baseUrl + InsuranceClaimsUrl;
  return deleteListResource(Url, claimId);
}
