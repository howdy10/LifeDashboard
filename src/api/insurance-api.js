import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { InsuranceClaimsUrl } from "../firebase/databaseLinks";

export function createInsuranceClaim(claim) {
  const database = getDatabase(firebase);
  const claimsUrl = InsuranceClaimsUrl();

  const newKey = push(child(ref(database), claimsUrl)).key;

  const updates = {};
  updates[claimsUrl + "/" + newKey] = claim;
  return update(ref(database), updates);
}

export function updateInsuranceClaim(claim, claimId) {
  const database = getDatabase(firebase);
  const claimsUrl = InsuranceClaimsUrl();

  const updates = {};
  updates[claimsUrl + "/" + claimId] = claim;
  return update(ref(database), updates);
}

export function deleteInsuranceClaim(claimId) {
  const database = getDatabase(firebase);
  const claimsUrl = InsuranceClaimsUrl();

  remove(ref(database, claimsUrl + "/" + claimId));
}
