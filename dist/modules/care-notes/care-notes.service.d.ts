import { Model } from 'mongoose';
import { CareNote } from './schemas/care-note.schema';
export declare class CareNotesService {
    private model;
    constructor(model: Model<CareNote>);
    findAll(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, CareNote, {}, {}> & CareNote & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, CareNote, {}, {}> & CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, CareNote, {}, {}> & CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, CareNote, {}, {}> & CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    shareWithFamily(id: string): Promise<import("mongoose").Document<unknown, {}, CareNote, {}, {}> & CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
