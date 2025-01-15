import { createAction } from "@reduxjs/toolkit";
import { Integration } from "./store";

export const setIntegrations = createAction<Integration>('set-integration');