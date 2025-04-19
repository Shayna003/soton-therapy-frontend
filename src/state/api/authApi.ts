import { BACKEND_URL, FECTH_USER_INFO_URL, LOGIN_URL, LOGOUT_URL, SIGNUP_URL } from "@/constants";
import { UserInfo } from "@/types";
import { SignInPayload, SignUpPayload } from "@/types/payloads";
import { SignUpResponse } from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    //reducerPath: "main",
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL, credentials: "include", }),
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