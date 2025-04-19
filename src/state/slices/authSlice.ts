import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { UserInfo } from '@/types'

interface AuthState {
    userInfo: UserInfo | undefined
}

const initialState: AuthState = {
    userInfo: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state: AuthState, action: PayloadAction<UserInfo | undefined>) => {
            state.userInfo = action.payload;
        }
    },
});

export const { setUserInfo } = authSlice.actions;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export default authSlice.reducer;