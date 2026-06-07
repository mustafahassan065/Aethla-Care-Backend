import { Model } from 'mongoose';
import { Client } from '../clients/schemas/client.schema';
import { Caregiver } from '../caregivers/schemas/caregiver.schema';
import { Schedule } from '../schedules/schemas/schedule.schema';
import { Incident } from '../incidents/schemas/incident.schema';
import { Invoice } from '../billing/schemas/invoice.schema';
export declare class DashboardService {
    private clientModel;
    private caregiverModel;
    private scheduleModel;
    private incidentModel;
    private invoiceModel;
    constructor(clientModel: Model<Client>, caregiverModel: Model<Caregiver>, scheduleModel: Model<Schedule>, incidentModel: Model<Incident>, invoiceModel: Model<Invoice>);
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
    getRevenue(query: any): Promise<{
        month: any;
        revenue: any;
        invoiced: any;
        visits: number;
    }[]>;
    getServiceDistribution(): Promise<{
        service: any;
        count: any;
    }[]>;
    getActivity(query: any): Promise<{
        schedules: (import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        incidents: (import("mongoose").Document<unknown, {}, Incident, {}, {}> & Incident & Required<{
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
