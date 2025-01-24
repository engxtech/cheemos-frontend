import { configureStore } from '@reduxjs/toolkit';
import { agentsReducer } from './agents/store';
import { toolsReducer } from './tools/store';

const store = configureStore({
    reducer: {
        agents: agentsReducer,
        tools:toolsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store  