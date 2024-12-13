import { createAction } from "@reduxjs/toolkit";
import { Agent } from "./store";

export const setCreateAgent = createAction<Agent>('set-agent');
