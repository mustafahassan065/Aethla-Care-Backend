import { Document } from 'mongoose';
export declare class Client extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email?: string;
    address: {
        street: string;
        area: string;
        city: string;
        country: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    status: string;
    careType: string[];
    medicalConditions: string[];
    allergies: string[];
    medications: object[];
    emergencyContacts: object[];
    carePlan?: object;
    assignedCaregivers: string[];
    notes?: string;
    consentSigned: boolean;
    insuranceInfo?: object;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client, any, {}> & Client & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Client> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
