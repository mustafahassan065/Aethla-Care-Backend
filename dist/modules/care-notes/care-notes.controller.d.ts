import { CareNotesService } from './care-notes.service';
export declare class CareNotesController {
    private readonly svc;
    constructor(svc: CareNotesService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/care-note.schema").CareNote, {}, {}> & import("./schemas/care-note.schema").CareNote & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/care-note.schema").CareNote, {}, {}> & import("./schemas/care-note.schema").CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/care-note.schema").CareNote, {}, {}> & import("./schemas/care-note.schema").CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/care-note.schema").CareNote, {}, {}> & import("./schemas/care-note.schema").CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    shareWithFamily(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/care-note.schema").CareNote, {}, {}> & import("./schemas/care-note.schema").CareNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
