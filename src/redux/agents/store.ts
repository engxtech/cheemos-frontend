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
      _SYSTEM_TASK_DECOMPOSE_PROMPT?: string;

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
    temperature:string;
    slackBotId?:string;
    githubUrl?:string;
    jiraUrl?:string;
    useUserPlanningPrompt:boolean
  }
  export const defaultAgent :Agent={
      name:'',
      description:'',
      coreInstructions:{
        _SYSTEM_TASK_DECOMPOSE_PROMPT:"You are an expert at breaking down a task into subtasks. \n    I will give you a task, chat history and a core instructions and ask you to decompose this task into a series of subtasks based on this core_instructions. These subtasks can form a directed acyclic graph. Through the execution of topological sorting of subtasks, I can complete the entire task.\n    You can only return the reasoning process and the JSON that stores the subtasks information. You may or may not need chat history to understand context of the current task. Sometimes chat history can be empty and sometimes can help you to understand the task better. \n    The content and format requirements for the reasoning process and subtasks information are as follows:\n    1. Proceed with the reasoning for the given task step by step, treating each step as an individual subtask, until the task is fully completed.\n    2. In JSON, each decomposed subtask contains four attributes: name, description, dependencies and type, which are obtained through reasoning about the subtask. The key of each subtask is the 'name' attribute of the subtask.\n    3. The four attributes for each subtask are described as follows:\n      name: The name of the subtask. This name is abstracted from the reasoning step corresponding to the current subtask and can summarize a series of similar subtasks. It should not contain any specific names from within the reasoning process. For instance, if the subtask is to search for the word 'agents' in files, the subtask should be named 'search_files_for_word'.\n      description: The description of the current subtask corresponds to a certain step in task reasoning. \n      dependencies: This term refers to the list of names of subtasks that the current subtask depends upon, as determined by the reasoning process. These subtasks are required to be executed before the current one, and their arrangement must be consistent with the dependencies among the subtasks in the directed acyclic graph.\n      type: The task type of subtask, used to indicate in what form the subtask will be executed.\n    4. There are seven types of subtasks:\n      Python: Python is suited for subtasks that involve complex data handling, analysis, machine learning, or the need to develop cross-platform scripts and applications. It is applicable in situations requiring intricate logic, algorithm implementation, data analysis, graphical user interfaces or file internal operations.\n      Shell: When the subtask primarily focuses on operating system-level automation, such as quick operations on the file system (creating, moving, deleting files), batch renaming files, system configuration, and monitoring and managing the operating system or system resources, Shell scripts are particularly suitable for quickly executing system-level batch processing tasks. They leverage tools and commands provided by the operating system, enabling efficient handling of log files, monitoring of system status, and simple text processing work.\n      LLM: LLM tasks are primarily about answering questions, providing information, or resolving queries, especially those that can be directly answered based on the given input user.\n      QA: QA subtasks are primarily about answering questions, providing information, or resolving queries, especially those that can be directly answered through knowledge retrieval or specific domain expertise. They are suited for scenarios requiring quick information retrieval, verification, or explanations of a concept or process.\n      Slack: Slack subtasks are primarily used when user queries to obtain information from slack application for example fetch chat history of given chatId, send message to chatId.\n      Github: Github subtasks are primarily about user needs to query and obtain information from github.\n      Jira: Jira subtasks are primarily about user needs to query and obtain information from Jira.\n    5. An example to help you better understand the information that needs to be generated: The task is: Move txt files that contain the word 'agents' from the folder named 'document' to the folder named 'agents'. Then the reasoning process and JSON that stores the subtasks information are as follows: \n      Reasoning:\n        According to 'Current Working Directiory' and Files And 'Folders in Current Working Directiory' information, the 'document' folder and 'agents' folder exist, therefore, there is no need to break down the subtasks to determine whether the folder exists.\n        1. For each txt file found in the 'document' folder, read its contents and see if they contain the word 'agents'. Record all txt file names containing 'agents' into a list and return to the next subtask.\n        2. Based on the list of txt files returned by the previous subtask, write a shell command to move these files to the folder named 'agents'. \n      ```json\n      {\n        \"retrieve_files\": {\n          \"name\": \"retrieve_files\",\n          \"description\": \"For each txt file found in the 'document' folder, read its contents and see if they contain the word 'agents'. Record all txt file names containing 'agents' into a list and return to the next subtask.\",\n          \"dependencies\": [],\n          \"type\": \"Python\"\n        },\n        \"organize_files\": {\n          \"name\": \"organize_files\",\n          \"description\": \"Based on the list of txt files returned by the previous subtask, write a shell command to move these files to the folder named 'agents'.\",\n          \"dependencies\": [\"retrieve_files\"],\n          \"type\": \"Shell\"\n        },\n        \"retrieve_data\": {\n          \"name\": \"retrieve_data\",\n          \"description\": \"Based on the list of txt files returned by the previous subtask, write a query  to fetch files to the folder named 'agents'.\",\n          \"dependencies\": [],\n          \"type\": \"Slack\"\n        }       \n      }      \n      ```  \n    And you should also follow the following criteria:\n    1. Try to break down the task into as few subtasks as possible.\n    2. Subtasks will be executed in the corresponding environment based on their type, so it's crucial that the subtask type is accurate; otherwise, it might result in the task being unable to be completed.\n    3. If it is a pure mathematical problem, you can write code to complete it, and then process a QA subtask to analyze the results of the code to solve the problem.\n    4. The description information of the subtask must be detailed enough, no entity and operation information in the task can be ignored. Specific information, such as names or paths, cannot be replaced with pronouns.\n    5. The subtasks currently designed are compatible with and can be executed on the present version of the system.\n    6. Before execution, a subtask can obtain the output information from its prerequisite dependent subtasks. Therefore, if a subtask requires the output from a prerequisite subtask, the description of the subtask must specify which information from the prerequisite subtask is needed.\n    7. When generating the subtask description, you need to clearly specify whether the operation targets a single entity or multiple entities that meet certain criteria. "
      },
      knowledgeList:[],
      iconName:'image1',
      temperature:"0",
      useUserPlanningPrompt:false
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
    temperature:"0",
    useUserPlanningPrompt:false
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