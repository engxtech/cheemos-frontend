import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';

export interface Chat {
  id?: string;
  created: string;
  agentId?:string;
  templateId?:string;
  userId?:string;
  prevResponseReceived?:boolean;
  updatedAt: string;
}
const store = configureStore({
  reducer: {
    chat: chatReducer, // Add the chat reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
