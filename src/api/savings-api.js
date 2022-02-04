import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { SavingsUrl } from "../firebase/databaseLinks";

export function createSavingTransaction(transaction) {
  const database = getDatabase(firebase);
  const savingsUrl = SavingsUrl();

  const newTransactionsKey = push(child(ref(database), savingsUrl + "/Transactions")).key;

  const updates = {};
  updates[savingsUrl + "/transactions/" + newTransactionsKey] = transaction;
  updates[savingsUrl + "/bucketTransactions/" + transaction.bucketId + "/" + newTransactionsKey] =
    transaction;
  return update(ref(database), updates);
}

export function updateSavingTransaction(transaction, transactionId) {
  const database = getDatabase(firebase);
  const savingsUrl = SavingsUrl();

  const updates = {};
  updates[savingsUrl + "/transactions/" + transactionId] = transaction;
  updates[savingsUrl + "/bucketTransactions/" + transaction.bucketId + "/" + transactionId] =
    transaction;
  return update(ref(database), updates);
}

export function deleteSavingTransaction(transactionId, bucketId) {
  const database = getDatabase(firebase);
  const savingsUrl = SavingsUrl();

  remove(ref(database, savingsUrl + "/transactions/" + transactionId));
  remove(ref(database, savingsUrl + "/bucketTransactions/" + bucketId + "/" + transactionId));
}
