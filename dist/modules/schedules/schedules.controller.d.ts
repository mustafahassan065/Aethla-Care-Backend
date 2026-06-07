import { SchedulesService } from './schedules.service';
export declare class SchedulesController {
    private readonly svc;
    constructor(svc: SchedulesService);
    getAll(q: any): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getCalendar(q: any): Promise<any[]>;
    getOne(id: string): Promise<any>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    checkIn(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    checkOut(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
