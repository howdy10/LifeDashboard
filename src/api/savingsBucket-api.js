import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { BucketsUrl } from "../firebase/databaseConstants";

export function createSavingBucket(baseUrl, bucket) {
  const database = getDatabase(firebase);
  const bucketsUrl = baseUrl + BucketsUrl;

  const newKey = push(child(ref(database), bucketsUrl)).key;

  const updates = {};
  updates[bucketsUrl + "/" + newKey] = bucket;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to create saving bucket");
    console.error(error);
    console.log(bucketsUrl);
  });
}

export function updateSavingBucket(baseUrl, bucket, bucketId) {
  const database = getDatabase(firebase);
  const bucketsUrl = baseUrl + BucketsUrl;

  const updates = {};
  updates[bucketsUrl + "/" + bucketId] = bucket;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to Update saving bucket");
    console.error(error);
    console.log(bucketsUrl);
  });
}

export function deleteSavingBucket(baseUrl, bucketId) {
  const database = getDatabase(firebase);
  const bucketsUrl = baseUrl + BucketsUrl;

  remove(ref(database, bucketsUrl + "/" + bucketId)).catch((error) => {
    console.error("Unable to Delete saving bucket");
    console.error(error);
    console.log(bucketsUrl);
  });
}
