import { configureStore } from '@reduxjs/toolkit';
import { agentsReducer } from './agents/store';

const store = configureStore({
    reducer: {
        agents: agentsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store  