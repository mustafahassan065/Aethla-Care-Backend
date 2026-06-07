import { Document, Types } from 'mongoose';
export declare class Message extends Document {
    conversationId: string;
    senderId: Types.ObjectId;
    recipientIds: Types.ObjectId[];
    type: string;
    content: string;
    attachments: string[];
    isRead: boolean;
    isEncrypted: boolean;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message, any, {}> & Message & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Message> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
