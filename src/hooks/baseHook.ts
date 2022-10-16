import { useMemo, useEffect, useState } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { useAppSelector } from "../app/hooks";
import { HookReponse } from "./types";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export const GetFromDatabase = <T>(url: string): HookReponse<T> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [resArray, setResArray] = useState<HookReponse<T>>([undefined, true, undefined]);
  const [response, loading, error] = useObjectVal(ref(database, familyIdBaseUrl + url));

  useEffect(() => {
    setResArray([response, loading, error]);
  }, [response, loading, error]);

  return useMemo(() => resArray, [resArray]);
};
