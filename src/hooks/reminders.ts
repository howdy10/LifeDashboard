import { useState, useMemo, useEffect } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { RemindersUrl } from "../firebase/databaseConstants";
import { useAppSelector } from "../app/hooks";
import { selectFamilyBaseUrl } from "../app/sessionSlice";
import { HookReponse } from "./types";

export interface Reminder {}

export const GetReminders = (): HookReponse<any> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [list, setList] = useState(null);

  const [response, loading, error] = useObjectVal(ref(database, familyIdBaseUrl + RemindersUrl));

  useEffect(() => {
    setList(response);
  }, [response]);

  const resArray: HookReponse<any> = [list, loading, error];
  return useMemo(() => resArray, resArray);
};
