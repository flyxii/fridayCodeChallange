import { State, Actions, Action } from "./type";

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case Action.UPDATE_MAKE:
      return { ...state, make: action.payload };
    case Action.UPDATE_MODEL:
      return { ...state, model: action.payload };
    default:
      return state;
  }
};
