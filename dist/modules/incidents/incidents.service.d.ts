import { Model } from 'mongoose';
import { Incident } from './schemas/incident.schema';
export declare class IncidentsService {
    private model;
    constructor(model: Model<Incident>);
    findAll(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    resolve(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
