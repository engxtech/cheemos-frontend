import { createReducer } from "@reduxjs/toolkit";
import { setCreateAgent, setEditing, setRefresh } from "./action";
import image1 from "../../assets/Aatar.png";
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
    iconName:string;
    toolsList?: number[];
    subAgents?: number[];
    customProperties?: Record<string, any>;
    toolRetries?: number;
    welcomeMessage?: string;
    agentGuideText?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  export const defaultAgent :Agent={
      name:'',
      description:'',
      coreInstructions:{
        
      },
      iconName:'image1'
  } 
  export interface ChatList {
    id?: string;
    name:string;
    created:string;
    updatedAt:string;
  }
   


export interface StoreType {
  agent:Agent,
  refresh:boolean,
  editing:boolean
}
const initialState: StoreType = {
  agent:{
    name:"",
    description:"",
    coreInstructions:{
      
    },
    iconName:image1
  },
  refresh:false,
  editing:false
};

export const agentsReducer =createReducer(initialState,(builder)=>{
    builder
    .addCase(setCreateAgent, (state, action) => {
        state.agent = action.payload;
    })
    .addCase(setRefresh,(state, action) => {
      state.refresh = action.payload;
  })
  .addCase(setEditing,(state, action) => {
    state.editing = action.payload;
})
})