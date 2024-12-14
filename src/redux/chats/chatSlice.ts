import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  chatId: string | null;
}

const initialState: ChatState = {
  chatId: null, // Initialize with null (no chat selected by default)
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    clearChatId: (state) => {
      state.chatId = null; // Reset chatId
    },
  },
});

export const { setChatId, clearChatId } = chatSlice.actions;
export default chatSlice.reducer;
