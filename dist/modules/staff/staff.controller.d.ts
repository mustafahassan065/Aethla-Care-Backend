import { StaffService } from './staff.service';
export declare class StaffController {
    private readonly svc;
    constructor(svc: StaffService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../caregivers/schemas/caregiver.schema").Caregiver, {}, {}> & import("../caregivers/schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOnDuty(): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../caregivers/schemas/caregiver.schema").Caregiver, {}, {}> & import("../caregivers/schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
