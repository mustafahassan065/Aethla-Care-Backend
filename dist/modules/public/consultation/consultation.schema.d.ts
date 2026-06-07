import { Document } from 'mongoose';
export declare class Consultation extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    service: string;
    location: string;
    message?: string;
    status: string;
    notes?: string;
}
export declare const ConsultationSchema: import("mongoose").Schema<Consultation, import("mongoose").Model<Consultation, any, any, any, Document<unknown, any, Consultation, any, {}> & Consultation & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Consultation, Document<unknown, {}, import("mongoose").FlatRecord<Consultation>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Consultation> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
