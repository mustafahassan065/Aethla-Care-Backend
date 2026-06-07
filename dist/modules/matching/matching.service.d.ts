import { CaregiversService } from '../caregivers/caregivers.service';
export declare class MatchingService {
    private caregiversService;
    constructor(caregiversService: CaregiversService);
    match(criteria: any): Promise<{
        caregiver: import("mongoose").Document<unknown, {}, import("../caregivers/schemas/caregiver.schema").Caregiver, {}, {}> & import("../caregivers/schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        matchScore: number;
    }[]>;
}
