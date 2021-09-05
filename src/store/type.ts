export interface State {
  make: string;
  model: string;
}

export type UPDATE_MAKE = { type: Action.UPDATE_MAKE; payload: string };
export type UPDATE_MODEL = { type: Action.UPDATE_MODEL; payload: string };

export enum Action {
  UPDATE_MAKE,
  UPDATE_MODEL,
}

export type Actions = UPDATE_MAKE | UPDATE_MODEL;
