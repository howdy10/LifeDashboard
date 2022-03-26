import { firebase } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";

export function createListResource(listUrl, item) {
  const database = getDatabase(firebase);

  const newKey = push(child(ref(database), listUrl)).key;

  const updates = {};
  updates[listUrl + "/" + newKey] = item;
  return update(ref(database), updates);
}

export function updateListResource(listUrl, item, Id) {
  const database = getDatabase(firebase);

  const updates = {};
  updates[listUrl + "/" + Id] = item;
  return update(ref(database), updates);
}

export function deleteListResource(listUrl, Id) {
  const database = getDatabase(firebase);

  return remove(ref(database, listUrl + "/" + Id));
}
