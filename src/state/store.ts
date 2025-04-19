import { configureStore } from '@reduxjs/toolkit';
import authReducer from "@/state/slices//authSlice";
import chatReducer from "@/state/slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch