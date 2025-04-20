import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { AIModel, ChatMessage } from '@/types';
import { useDispatch } from 'react-redux';

interface ChatState {
    isAIGenerating: boolean;
    selectedModel: AIModel | undefined;
    userModels: AIModel[]
    currentModelMessages: ChatMessage[]
}

const initialState: ChatState = {
    isAIGenerating: false,
    selectedModel: undefined,
    userModels: [],
    currentModelMessages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setAIGenerating: (state: ChatState, action: PayloadAction<boolean>) => {
            state.isAIGenerating = action.payload;
        },
        setSelectedModel: (state: ChatState, action: PayloadAction<AIModel | undefined>) => {
            state.selectedModel = action.payload;
        },
        setUserModels: (state: ChatState, action: PayloadAction<AIModel[]>) => {
            state.userModels = action.payload;
        },
        setCurrentModelMessages: (state: ChatState, action: PayloadAction<ChatMessage[]>) => {
            state.currentModelMessages = action.payload;
        },
        addNewMessage: (state: ChatState, action: PayloadAction<ChatMessage>) => {
            if (state.selectedModel?._id === action.payload.sender) {
                state.currentModelMessages.push(action.payload);
            } else if (state.selectedModel?._id === action.payload.receiver) {
                state.currentModelMessages.push(action.payload);
            }
        },
        setIsAIGenerating: (state: ChatState, action: PayloadAction<boolean>) => {
            state.isAIGenerating = action.payload;
        }
    },
});

export const { setAIGenerating, setSelectedModel,setUserModels, setCurrentModelMessages, addNewMessage, setIsAIGenerating } = chatSlice.actions;
export const selectIsAIGenerating = (state: RootState) => state.chat.isAIGenerating;
export const selectCurrentModel = (state: RootState) => state.chat.selectedModel;
export const selectUserModels = (state: RootState) => state.chat.userModels;
export const selectCurrentModelMessages = (state: RootState) => state.chat.currentModelMessages;

export default chatSlice.reducer;