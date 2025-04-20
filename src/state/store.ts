import { configureStore } from '@reduxjs/toolkit';
import authReducer from "@/state/slices/authSlice";
import chatReducer from "@/state/slices/chatSlice";
import { authApi } from '@/state/api/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { chatApi } from './api/chatApi';
import { modelsApi } from './api/modelsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(chatApi.middleware).concat(modelsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);