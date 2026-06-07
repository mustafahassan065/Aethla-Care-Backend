import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly svc;
    constructor(svc: DashboardService);
    getStats(): Promise<{
        activeClients: number;
        staffOnDuty: number;
        openIncidents: number;
        pendingInvoices: number;
        monthlyRevenue: any;
        satisfactionRate: number;
        visitsToday: number;
        missedVisits: number;
    }>;
    getRevenue(q: any): Promise<{
        month: any;
        revenue: any;
        invoiced: any;
        visits: number;
    }[]>;
    getServiceDistribution(): Promise<{
        service: any;
        count: any;
    }[]>;
    getActivity(q: any): Promise<{
        schedules: (import("mongoose").Document<unknown, {}, import("../schedules/schemas/schedule.schema").Schedule, {}, {}> & import("../schedules/schemas/schedule.schema").Schedule & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        incidents: (import("mongoose").Document<unknown, {}, import("../incidents/schemas/incident.schema").Incident, {}, {}> & import("../incidents/schemas/incident.schema").Incident & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getAlerts(): Promise<{
        overdueInvoices: number;
        criticalIncidents: number;
        missedVisits: number;
    }>;
}
