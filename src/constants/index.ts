export const BACKEND_URL: string = import.meta.env.VITE_PUBLIC_BACKEND_URL as string;

export const FECTH_USER_INFO_URL: string = BACKEND_URL + "/api/authentication/fetchuserinfo";
export const LOGIN_URL: string = BACKEND_URL + "/api/authentication/signin";
export const SIGNUP_URL: string = BACKEND_URL + "/api/authentication/signup";
export const LOGOUT_URL: string = BACKEND_URL + "/api/authentication/signout";

export const AI_MODELS_URL : string = BACKEND_URL + "/api/ai-models";
export const GET_USER_MODELS_URL = BACKEND_URL + "/api/ai-models/user";
export const SEARCH_MODELS_URL = BACKEND_URL + "/api/ai-models/search";
export const FETCH_MESSAGES_URL = BACKEND_URL + "/api/messages/fetchmessages";

export const HONEY_BADGER_API_KEY = import.meta.env.VITE_PUBLIC_HONEYBADGER_API_KEY as string;