import { useMemo } from "react";
import { ref, getDatabase } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseApp } from "../firebase/clientApp";
import { useAppSelector } from "../app/hooks";
import { HookReponse } from "./types";
import { selectFamilyBaseUrl } from "../app/sessionSlice";

export const GetFromDatabase = (url: string): HookReponse<any> => {
  const database = getDatabase(firebaseApp);
  const familyIdBaseUrl = useAppSelector(selectFamilyBaseUrl);

  const [response, loading, error] = useObjectVal(ref(database, familyIdBaseUrl + url));

  const resArray: HookReponse<any> = [response, loading, error];
  return useMemo(() => resArray, resArray);
};
