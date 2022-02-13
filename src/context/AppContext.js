import { createContext, useContext } from "react";

const AppContext = createContext({});

export default AppContext;

export function useAuth() {
  return useContext(AppContext);
}
