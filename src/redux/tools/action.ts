import { createAction } from "@reduxjs/toolkit";
import { ToolDto } from "./store";

export const setCreateTool = createAction<ToolDto>('set-tool');
export const setRefreshTool =createAction<boolean>('set-refresh-tool')
export const setEditingTool = createAction<boolean>('SET_EDITING_TOOL');
