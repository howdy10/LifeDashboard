import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface SessionState {
  user: string;
  familyIdBaseUrl: string;
}

// Define the initial state using that type
const initialState: SessionState = {
  user: null,
  familyIdBaseUrl: null,
};

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, name: PayloadAction<string>) => {
      state.user = name.payload;
    },
    setFamilyIdBaseUrl: (state, baseUrl: PayloadAction<string>) => {
      state.familyIdBaseUrl = baseUrl.payload;
    },
  },
});

export const { setUser, setFamilyIdBaseUrl } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.session.user;
export const selectFamilyBaseUrl = (state: RootState) => state.session.familyIdBaseUrl;

export default sessionSlice.reducer;
