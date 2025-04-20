import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL, FETCH_MESSAGES_URL } from "@/constants";


export const chatApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        credentials: "include",
    }),
    reducerPath: "messages",
    endpoints: (build) => ({
        postFetchMessages: build.mutation({
            query: (payload) => ({
                url: FETCH_MESSAGES_URL,
                method: "POST",
                body: payload as string,
            }),
        }),
    }),
});

export const { usePostFetchMessagesMutation } = chatApi;
