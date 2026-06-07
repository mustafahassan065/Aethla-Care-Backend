import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
export declare class MessagesService {
    private model;
    constructor(model: Model<Message>);
    getConversations(): Promise<any[]>;
    getMessages(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    send(dto: any): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    markRead(conversationId: string): Promise<import("mongoose").UpdateWriteOpResult>;
    broadcast(dto: any): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, Omit<any, "_id">>[]>;
}
