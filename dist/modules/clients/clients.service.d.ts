import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
export declare class ClientsService {
    private clientModel;
    constructor(clientModel: Model<Client>);
    findAll(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getCarePlan(id: string): Promise<object>;
    updateCarePlan(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
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
