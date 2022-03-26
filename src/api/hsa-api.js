import { HsaTransactionsUrl } from "../firebase/databaseConstants";
import { createListResource, deleteListResource, updateListResource } from "./rest-list-api";

export function createHsaTransaction(baseUrl, claim) {
  const Url = baseUrl + HsaTransactionsUrl;
  createListResource(Url, claim);
}

export function updateHsaTransaction(baseUrl, claim, claimId) {
  const Url = baseUrl + HsaTransactionsUrl;
  updateListResource(Url, claim, claimId);
}

export function deleteHsaTransaction(baseUrl, transactionId) {
  const Url = baseUrl + HsaTransactionsUrl;
  deleteListResource(Url, transactionId);
}
