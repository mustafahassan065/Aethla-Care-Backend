import { Model } from 'mongoose';
import { Caregiver } from './schemas/caregiver.schema';
export declare class CaregiversService {
    private caregiverModel;
    constructor(caregiverModel: Model<Caregiver>);
    findAll(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    matchCaregiver(criteria: any): Promise<{
        caregiver: import("mongoose").Document<unknown, {}, Caregiver, {}, {}> & Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        matchScore: number;
    }[]>;
    getSchedule(id: string, query: any): Promise<{
        caregiverId: string;
        shifts: any[];
    }>;
    cleanBrokenRecords(): Promise<{
        message: string;
    }>;
}
