import { CaregiversService } from './caregivers.service';
export declare class CaregiversController {
    private readonly svc;
    constructor(svc: CaregiversService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    match(criteria: any): Promise<{
        caregiver: import("mongoose").Document<unknown, {}, import("./schemas/caregiver.schema").Caregiver, {}, {}> & import("./schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        matchScore: number;
    }[]>;
    getSchedule(id: string, q: any): Promise<{
        caregiverId: string;
        shifts: any[];
    }>;
}
