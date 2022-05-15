import { useMemo } from "react";
import { ref, getDatabase } from "firebase/database";
import { useListKeys } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { HookReponse } from "./types";

export const GetFamilyBaseUrl = (): HookReponse<string> => {
  const database = getDatabase(firebaseApp);
  const auth = getAuth();
  const user = auth.currentUser;

  const [snapshots, loading, error] = useListKeys(ref(database, "userGroups/" + user?.uid));

  const values = useMemo(() => (snapshots[0] ? "family/" + snapshots[0] : null), [snapshots]);
  const userErrors = useMemo(
    () => (snapshots[0] ? undefined : new Error("No family assosiated with user")),
    [snapshots]
  );

  const resArray: HookReponse<string> = [values, loading, userErrors];
  return useMemo(() => resArray, resArray);
};
