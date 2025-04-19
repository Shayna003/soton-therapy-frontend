import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'

interface ChatState {
    selectedChat: undefined;
    isAIGenerating: boolean;
    selectedModel: undefined;
}

const initialState: ChatState = {
    selectedChat: undefined,
    isAIGenerating: false,
    selectedModel: undefined,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

    },
});

export const {  } = chatSlice.actions;
export default chatSlice.reducer;