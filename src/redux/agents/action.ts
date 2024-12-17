import { createAction } from "@reduxjs/toolkit";
import { Agent } from "./store";

export const setCreateAgent = createAction<Agent>('set-agent');
export const setRefresh =createAction<boolean>('set-refresh')