import { IncidentsService } from './incidents.service';
export declare class IncidentsController {
    private readonly svc;
    constructor(svc: IncidentsService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/incident.schema").Incident, {}, {}> & import("./schemas/incident.schema").Incident & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/incident.schema").Incident, {}, {}> & import("./schemas/incident.schema").Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/incident.schema").Incident, {}, {}> & import("./schemas/incident.schema").Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/incident.schema").Incident, {}, {}> & import("./schemas/incident.schema").Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    resolve(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/incident.schema").Incident, {}, {}> & import("./schemas/incident.schema").Incident & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
