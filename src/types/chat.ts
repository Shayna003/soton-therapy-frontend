
//import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

export type modelType = "User" | "AIModel";
export type messageType = "text" | "file" | "context";

export type ChatMessage = {
    _id: string;
    sender: string;
    receiver: string;
    senderModel: modelType;
    receiverModel: modelType;
    message?: string;
    content?: string;
    isAI: boolean;
    messageType: messageType;
    timeStamp: Date;
}

export type AIModel = {
    id?: string,
    _id?: string,
    name: string,
    description: string
}