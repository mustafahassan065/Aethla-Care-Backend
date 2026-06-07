"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("../clients/schemas/client.schema");
const caregiver_schema_1 = require("../caregivers/schemas/caregiver.schema");
const schedule_schema_1 = require("../schedules/schemas/schedule.schema");
const incident_schema_1 = require("../incidents/schemas/incident.schema");
const invoice_schema_1 = require("../billing/schemas/invoice.schema");
let DashboardService = class DashboardService {
    constructor(clientModel, caregiverModel, scheduleModel, incidentModel, invoiceModel) {
        this.clientModel = clientModel;
        this.caregiverModel = caregiverModel;
        this.scheduleModel = scheduleModel;
        this.incidentModel = incidentModel;
        this.invoiceModel = invoiceModel;
    }
    async getStats() {
        const today = new Date().toISOString().split('T')[0];
        const [activeClients, staffOnDuty, openIncidents, pendingInvoices, monthRevenue, visitsToday, missedVisits] = await Promise.all([
            this.clientModel.countDocuments({ status: 'active' }),
            this.caregiverModel.countDocuments({ status: 'active' }),
            this.incidentModel.countDocuments({ status: { $in: ['open', 'investigating'] } }),
            this.invoiceModel.countDocuments({ status: { $in: ['sent', 'overdue'] } }),
            this.invoiceModel.aggregate([
                { $match: { status: 'paid' } },
                { $group: { _id: null, total: { $sum: '$total' } } },
            ]),
            this.scheduleModel.countDocuments({ date: today }),
            this.scheduleModel.countDocuments({ date: today, status: 'missed' }),
        ]);
        return {
            activeClients,
            staffOnDuty,
            openIncidents,
            pendingInvoices,
            monthlyRevenue: monthRevenue[0]?.total || 0,
            satisfactionRate: 98,
            visitsToday,
            missedVisits,
        };
    }
    async getRevenue(query) {
        const results = await this.invoiceModel.aggregate([
            { $match: { status: 'paid' } },
            {
                $group: {
                    _id: { $substr: ['$createdAt', 0, 7] },
                    revenue: { $sum: '$total' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            { $limit: 12 },
        ]);
        const visitResults = await this.scheduleModel.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: { $substr: ['$date', 0, 7] },
                    visits: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            { $limit: 12 },
        ]);
        const visitMap = {};
        visitResults.forEach((v) => { visitMap[v._id] = v.visits; });
        const monthNames = {
            '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
            '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
            '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
        };
        return results.map((r) => ({
            month: monthNames[r._id?.split('-')[1]] || r._id,
            revenue: r.revenue || 0,
            invoiced: r.revenue || 0,
            visits: visitMap[r._id] || 0,
        }));
    }
    async getServiceDistribution() {
        const results = await this.clientModel.aggregate([
            { $match: { status: 'active' } },
            { $unwind: '$careType' },
            { $group: { _id: '$careType', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        return results.map((r) => ({ service: r._id, count: r.count }));
    }
    async getActivity(query) {
        const [recentSchedules, recentIncidents] = await Promise.all([
            this.scheduleModel
                .find({ status: 'completed' })
                .populate('clientId', 'firstName lastName')
                .sort({ updatedAt: -1 })
                .limit(5),
            this.incidentModel.find().sort({ createdAt: -1 }).limit(5),
        ]);
        return { schedules: recentSchedules, incidents: recentIncidents };
    }
    async getAlerts() {
        const today = new Date().toISOString().split('T')[0];
        const [overdueInvoices, criticalIncidents, missedVisits] = await Promise.all([
            this.invoiceModel.countDocuments({ status: 'overdue' }),
            this.incidentModel.countDocuments({ severity: 'critical', status: 'open' }),
            this.scheduleModel.countDocuments({ status: 'missed', date: today }),
        ]);
        return { overdueInvoices, criticalIncidents, missedVisits };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __param(1, (0, mongoose_1.InjectModel)(caregiver_schema_1.Caregiver.name)),
    __param(2, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __param(3, (0, mongoose_1.InjectModel)(incident_schema_1.Incident.name)),
    __param(4, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map