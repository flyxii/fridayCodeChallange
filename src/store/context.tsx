/**
 * The useContext hook to create a store that could share data among components
 */

import React, { createContext, useReducer } from "react";
import { reducer } from "./reducers";
import { State, Actions } from "./type";

const initialState: State = {
  make: "",
  model: "",
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
