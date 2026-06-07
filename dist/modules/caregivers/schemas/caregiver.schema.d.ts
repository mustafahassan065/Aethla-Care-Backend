import { Document, Types } from 'mongoose';
export type CaregiverDocument = Caregiver & Document;
export declare class Caregiver {
    userId: Types.ObjectId;
    licenseNumber: string;
    licenseExpiry: Date;
    specializations: string[];
    languages: string[];
    experience: number;
    hourlyRate: number;
    bio: string;
    status: string;
    backgroundCheckStatus: string;
    rating: number;
    totalReviews: number;
    currentClients: Types.ObjectId[];
}
export declare const CaregiverSchema: import("mongoose").Schema<Caregiver, import("mongoose").Model<Caregiver, any, any, any, Document<unknown, any, Caregiver, any, {}> & Caregiver & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Caregiver, Document<unknown, {}, import("mongoose").FlatRecord<Caregiver>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Caregiver> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
