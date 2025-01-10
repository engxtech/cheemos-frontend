import { createReducer } from "@reduxjs/toolkit";
import { setCreateAgent, setEditing, setRefresh } from "./action";
import image1 from "../../assets/Aatar.png";
import { ToolDto } from "../tools/store";
export interface Knowledge{
  id?:string;
  name:string;
  inputData:string;
  inputType:string;
  agentId?:string;
}
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
    knowledgeList:Knowledge[]
    toolsListCore?:ToolDto[]; // for setting core instructions only!
    subAgents?: number[];
    customProperties?: Record<string, any>;
    toolRetries?: number;
    welcomeMessage?: string;
    agentGuideText?: string;
    createdAt?: string;
    updatedAt?: string;
    temperature:string

  }
  export const defaultAgent :Agent={
      name:'',
      description:'',
      coreInstructions:{
        
      },
      knowledgeList:[],
      iconName:'image1',
      temperature:"0"
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
    knowledgeList:[],
    iconName:image1,
    temperature:"0"
  },
  refresh:false,
  editing:false,
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