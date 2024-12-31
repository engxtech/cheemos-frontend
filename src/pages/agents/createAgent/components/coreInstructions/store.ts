export interface Input {
    id: string;
    value?: string;
    label: string;
  }
  
  export interface Tool {
    id: string;
    name: string;
    toolType: string;
    description: string;
  }
  
  export interface Variable {
    id: string;
    name: string;
  }