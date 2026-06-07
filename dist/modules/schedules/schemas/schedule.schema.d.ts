import { Document, Types } from 'mongoose';
export declare class Schedule extends Document {
    clientId: Types.ObjectId;
    caregiverId: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    serviceType: string;
    notes?: string;
    checkInTime?: string;
    checkOutTime?: string;
    checkInLocation?: object;
    checkOutLocation?: object;
    careNoteId?: Types.ObjectId;
}
export declare const ScheduleSchema: import("mongoose").Schema<Schedule, import("mongoose").Model<Schedule, any, any, any, Document<unknown, any, Schedule, any, {}> & Schedule & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule, Document<unknown, {}, import("mongoose").FlatRecord<Schedule>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Schedule> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
