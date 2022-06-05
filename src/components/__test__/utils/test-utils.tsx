import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import our reducer
import sessionReducer from "../../../app/sessionSlice";

export const renderWithState = (ui: any, { initialState, ...renderOptions }: any) => {
  const store = configureStore({ reducer: sessionReducer, preloadedState: initialState });
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
