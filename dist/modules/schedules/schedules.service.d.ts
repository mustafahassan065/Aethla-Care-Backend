import { Model, Types } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';
export declare class SchedulesService {
    private scheduleModel;
    constructor(scheduleModel: Model<Schedule>);
    private populateCaregiverUser;
    findAll(query: any): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    checkIn(id: string, location: any): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    checkOut(id: string, location: any): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getCalendar(query: any): Promise<any[]>;
}
