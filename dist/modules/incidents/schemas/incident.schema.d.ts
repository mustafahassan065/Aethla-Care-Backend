import { Document, Types } from 'mongoose';
export declare class Incident extends Document {
    clientId: Types.ObjectId;
    caregiverId: Types.ObjectId;
    scheduleId?: Types.ObjectId;
    type: string;
    severity: string;
    description: string;
    actionTaken: string;
    reportedTo: string[];
    followUpRequired: boolean;
    followUpNotes?: string;
    status: string;
    resolvedAt?: string;
}
export declare const IncidentSchema: import("mongoose").Schema<Incident, import("mongoose").Model<Incident, any, any, any, Document<unknown, any, Incident, any, {}> & Incident & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Incident, Document<unknown, {}, import("mongoose").FlatRecord<Incident>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Incident> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
