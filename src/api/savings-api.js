import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { SavingsUrl } from "../firebase/databaseConstants";

export function createSavingTransaction(baseUrl, transaction) {
  const database = getDatabase(firebase);
  const savingsUrl = baseUrl + SavingsUrl;

  const newTransactionsKey = push(child(ref(database), savingsUrl + "/Transactions")).key;

  const updates = {};
  updates[savingsUrl + "/transactions/" + newTransactionsKey] = transaction;
  updates[savingsUrl + "/bucketTransactions/" + transaction.bucketId + "/" + newTransactionsKey] =
    transaction;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to create saving transaction");
    console.error(error);
    console.log(savingsUrl);
  });
}

export function updateSavingTransaction(baseUrl, transaction, transactionId) {
  const database = getDatabase(firebase);
  const savingsUrl = baseUrl + SavingsUrl;

  const updates = {};
  updates[savingsUrl + "/transactions/" + transactionId] = transaction;
  updates[savingsUrl + "/bucketTransactions/" + transaction.bucketId + "/" + transactionId] =
    transaction;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to Update saving transaction");
    console.error(error);
    console.log(savingsUrl);
  });
}

export function deleteSavingTransaction(baseUrl, transactionId, bucketId) {
  const database = getDatabase(firebase);
  const savingsUrl = baseUrl + SavingsUrl;

  remove(ref(database, savingsUrl + "/transactions/" + transactionId));
  remove(ref(database, savingsUrl + "/bucketTransactions/" + bucketId + "/" + transactionId));
}

export function updateSavingsBucketTotal(baseUrl, bucket, id) {
  const database = getDatabase(firebase);
  const savingsUrl = baseUrl + SavingsUrl;

  const updates = {};
  if (id === "emergencyFund") {
    updates[savingsUrl + "/" + id] = bucket;
  } else {
    updates[savingsUrl + "/buckets/" + id] = bucket;
  }

  return update(ref(database), updates).catch((error) => {
    console.error("Unable to update saving bucket total");
    console.error(error);
    console.log(savingsUrl);
  });
}
