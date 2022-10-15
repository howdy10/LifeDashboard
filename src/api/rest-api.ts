import { firebaseApp } from "../firebase/clientApp";
import { ref, getDatabase, push, child, update, remove } from "firebase/database";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export function baseCreate<T>(object: T, url: string) {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const wholeUrl = familyIdBaseUrl + url;

  const newKey = push(child(ref(database), wholeUrl)).key;

  const updates = {};
  updates[wholeUrl + "/" + newKey] = object;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to create object");
    console.error(error);
    console.log(wholeUrl);
  });
}

export function baseUpdate<T>(object: T, objectId: string, url: string) {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const wholeUrl = familyIdBaseUrl + url;

  const updates = {};
  updates[wholeUrl + "/" + objectId] = object;
  return update(ref(database), updates).catch((error) => {
    console.error("Unable to Update object");
    console.error(error);
    console.log(wholeUrl);
  });
}

export function baseDelete(objectId: string, url: string) {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);
  const wholeUrl = familyIdBaseUrl + url;

  remove(ref(database, wholeUrl + "/" + objectId)).catch((error) => {
    console.error("Unable to Delete object");
    console.error(error);
    console.log(wholeUrl);
  });
}
