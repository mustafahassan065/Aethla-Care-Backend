import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly svc;
    constructor(svc: MessagesService);
    getConvos(): Promise<any[]>;
    getMsgs(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    send(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    markRead(id: string): Promise<import("mongoose").UpdateWriteOpResult>;
    broadcast(dto: any): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, Omit<any, "_id">>[]>;
}
