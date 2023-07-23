import { firebaseApp } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";

export function BaseCreateOrUpdate<T>(item: T, url: string) {
  const database = getDatabase(firebaseApp);

  const updates = {};
  updates[url] = item;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to create/update object");
    console.error(error);
    console.log(url);
  });
}

export function BaseDelete(url: string) {
  const database = getDatabase(firebaseApp);

  return remove(ref(database, url)).catch((error) => {
    console.error("Unable to Delete object");
    console.error(error);
    console.log(url);
  });
}
