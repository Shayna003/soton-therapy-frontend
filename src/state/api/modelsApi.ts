import { AI_MODELS_URL, BACKEND_URL, GET_USER_MODELS_URL, SEARCH_MODELS_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modelsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL, credentials: "include", }),
    reducerPath: "models",
    endpoints: (builder) => ({
        getAllModels: builder.query({
            query: () => ({
                url: AI_MODELS_URL,
                method: "GET",
            }),
        }),
        postFetchUserModels: builder.mutation({
            query: (payload) => ({
                url: GET_USER_MODELS_URL,
                method: "POST",
                body: payload as string
            }),
        }),
        postSearchModel: builder.mutation({
            query: (payload) => ({
              url: SEARCH_MODELS_URL,
              method: "POST",
              body: payload as string
            }),
        }),
        getModelInfo: builder.query({
            query: (modelID) => ({
              url: `${AI_MODELS_URL}/${modelID}`,
              method: "GET",
            }),
        }),
    })
});

export const {
    useGetAllModelsQuery,
    usePostFetchUserModelsMutation,
    usePostSearchModelMutation,
    useGetModelInfoQuery,
} = modelsApi;