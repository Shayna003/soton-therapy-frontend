import { BACKEND_URL, FECTH_USER_INFO_URL, LOGIN_URL, LOGOUT_URL, SIGNUP_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL, credentials: "include", }),
    reducerPath: "main",
    endpoints: (builder) => ({
        postLogIn: builder.mutation({
            query: (payload) => ({
                url: LOGIN_URL,
                method: "POST",
                body: payload as string
            }),
        }),
        postSignUp: builder.mutation({
            query: (payload) => ({
                url: SIGNUP_URL,
                method: "POST",
                body: payload as string
            }),
        }),
        postLogOut: builder.mutation({
            query: () => ({
              url: LOGOUT_URL,
              method: "POST",
            }),
        }),
        getUserInfo: builder.query({
            query: () => ({
              url: FECTH_USER_INFO_URL,
              method: "GET",
            }),
        }),
    })
});

export const {
    usePostLogInMutation,
    usePostSignUpMutation,
    usePostLogOutMutation,
    useGetUserInfoQuery,
} = authApi;