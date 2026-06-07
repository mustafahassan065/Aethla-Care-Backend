import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getCarePlan(id: string): Promise<object>;
    updateCarePlan(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client.schema").Client, {}, {}> & import("./schemas/client.schema").Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getHistory(id: string): Promise<{
        clientId: string;
        notes: any[];
        schedules: any[];
    }>;
}
