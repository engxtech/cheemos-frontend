export interface Template {
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
    iconName?:string;
    isHot?:Boolean
    price:number;
  }