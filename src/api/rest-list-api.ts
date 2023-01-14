import { firebaseApp } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";

export function createListResource<T>(listUrl: string, item: T) {
  const database = getDatabase(firebaseApp);

  const newKey = push(child(ref(database), listUrl)).key;

  const updates = {};
  updates[listUrl + "/" + newKey] = item;
  return update(ref(database), updates);
}

export function updateListResource<T>(listUrl: string, item: T, Id: string) {
  const database = getDatabase(firebaseApp);

  const updates = {};
  updates[listUrl + "/" + Id] = item;
  return update(ref(database), updates);
}

export function deleteListResource(listUrl: string, Id) {
  const database = getDatabase(firebaseApp);

  return remove(ref(database, listUrl + "/" + Id));
}
