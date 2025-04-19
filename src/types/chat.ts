
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

export type modelType = "User" | "AIModel";
export type messageType = "text" | "file" | "context";

export type ChatMessage = {
    _id: ObjectId;
    sender: ObjectId;
    receiver: ObjectId;
    senderModel: modelType;
    receiverModel: modelType;
    message: string;
    isAI: boolean;
    messageType: messageType;
    timeStamp: Date;
}

