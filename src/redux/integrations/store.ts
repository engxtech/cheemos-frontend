import { createReducer } from "@reduxjs/toolkit";
import { setIntegrations } from "./action";

export interface Integration {
  id?: string;
  userId?: string;
  slackToken?: string;
}

export interface StoreType {
  integration: Integration;
}
const initialState: StoreType = {
  integration: {},
};

export const integrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setIntegrations, (state, action) => {
    state.integration = action.payload;
  });
});
