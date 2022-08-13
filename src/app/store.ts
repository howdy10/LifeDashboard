import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import sessionReducer from "./sessionSlice";

export function makeStore() {
  return configureStore({
    reducer: { session: sessionReducer },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
