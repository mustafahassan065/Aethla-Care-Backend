import { Document, Types } from 'mongoose';
export declare class CareNote extends Document {
    scheduleId: Types.ObjectId;
    clientId: Types.ObjectId;
    caregiverId: Types.ObjectId;
    visitDate: string;
    summary: string;
    tasksCompleted: string[];
    observations: string;
    mood: string;
    vitalSigns?: object;
    medications: object[];
    incidents: object[];
    photos: string[];
    voiceNoteUrl?: string;
    familyShared: boolean;
}
export declare const CareNoteSchema: import("mongoose").Schema<CareNote, import("mongoose").Model<CareNote, any, any, any, Document<unknown, any, CareNote, any, {}> & CareNote & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CareNote, Document<unknown, {}, import("mongoose").FlatRecord<CareNote>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<CareNote> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
