import { createReducer } from "@reduxjs/toolkit";
import { setCreateAgent, setRefresh } from "./action";
export interface Agent {
    id?: string;
    name: string;
    description: string;
    coreInstructions: {
      // promptName?: string;
      // systemPrompt?: string;
      // userPrompt?: string;
      _SYSTEM_CORE_INSTRUCTIONS_PROMPT?: string;

    };
    toolsList?: number[];
    subAgents?: number[];
    customProperties?: Record<string, any>;
    toolRetries?: number;
    welcomeMessage?: string;
    agentGuideText?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  export interface ChatList {
    id?: string;
    name:string;
    created:string;
    updatedAt:string;
  }
   


export interface StoreType {
  agent:Agent,
  refresh:boolean
}
const initialState: StoreType = {
  agent:{
    name:"",
    description:"",
    coreInstructions:{
      
    }
  },
  refresh:false
};

export const agentsReducer =createReducer(initialState,(builder)=>{
    builder
    .addCase(setCreateAgent, (state, action) => {
        state.agent = action.payload;
    })
    .addCase(setRefresh,(state, action) => {
      state.refresh = action.payload;
  })
})