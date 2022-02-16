import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { InsuranceClaimsUrl } from "../firebase/databaseConstants";

export function createInsuranceClaim(baseUrl, claim) {
  const database = getDatabase(firebase);
  const claimsUrl = baseUrl + InsuranceClaimsUrl;

  const newKey = push(child(ref(database), claimsUrl)).key;

  const updates = {};
  updates[claimsUrl + "/" + newKey] = claim;
  return update(ref(database), updates);
}

export function updateInsuranceClaim(baseUrl, claim, claimId) {
  const database = getDatabase(firebase);
  const claimsUrl = baseUrl + InsuranceClaimsUrl;

  const updates = {};
  updates[claimsUrl + "/" + claimId] = claim;
  return update(ref(database), updates);
}

export function deleteInsuranceClaim(baseUrl, claimId) {
  const database = getDatabase(firebase);
  const claimsUrl = baseUrl + InsuranceClaimsUrl;

  remove(ref(database, claimsUrl + "/" + claimId));
}
