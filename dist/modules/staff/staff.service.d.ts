import { CaregiversService } from '../caregivers/caregivers.service';
export declare class StaffService {
    private caregiversService;
    constructor(caregiversService: CaregiversService);
    findAll(query: any): Promise<{
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
