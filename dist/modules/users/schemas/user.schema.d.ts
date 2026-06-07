import { Document } from 'mongoose';
export type UserRole = 'admin' | 'coordinator' | 'caregiver' | 'family' | 'accountant';
export declare class User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    avatar?: string;
    isActive: boolean;
    isVerified: boolean;
    mfaEnabled: boolean;
    lastLoginAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
