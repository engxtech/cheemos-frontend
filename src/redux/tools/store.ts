
import { createReducer } from "@reduxjs/toolkit";
import { setCreateTool, setEditingTool, setRefreshTool } from "./action";

export interface ToolDto {
  id?: string;
  name: string;
  description: string;
  content?: string;
  toolType: string;
}


export interface StoreType {
  tool: ToolDto;
  refreshTool: boolean;
  editingTool: boolean;
}
const initialState: StoreType = {
  tool: {
    name: "",
    description: "",
    toolType: "Python",
  },
  refreshTool: false,
  editingTool: false,
};

export const toolsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCreateTool, (state, action) => {
      state.tool = action.payload;
    })
    .addCase(setRefreshTool, (state, action) => {
      state.refreshTool = action.payload;
    })
    .addCase(setEditingTool, (state, action) => {
      state.editingTool = action.payload;
    });
});
