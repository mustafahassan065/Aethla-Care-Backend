import { MatchingService } from './matching.service';
export declare class MatchingController {
    private readonly svc;
    constructor(svc: MatchingService);
    match(criteria: any): Promise<{
        caregiver: import("mongoose").Document<unknown, {}, import("../caregivers/schemas/caregiver.schema").Caregiver, {}, {}> & import("../caregivers/schemas/caregiver.schema").Caregiver & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        matchScore: number;
    }[]>;
}
