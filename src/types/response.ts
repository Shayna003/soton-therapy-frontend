import { AIModel, ChatMessage } from "./chat";
import { UserInfo } from "./user";

export interface SignOutResponse {
    data: {
      message: string;
    };
}

export interface AuthResponse {
    data: {
        user : UserInfo
    };
}

export interface ModelListResponse {
    data: {
        aiModels: AIModel[]
    }
}

export interface UserModelListResponse {
    data: {
        models: AIModel[]
    }
}

export interface AIModelResponse {
    data: {
        aiModel: AIModel
    }
}

export interface MessagesResponse {
    data: {
        messages: ChatMessage[]
    }
}