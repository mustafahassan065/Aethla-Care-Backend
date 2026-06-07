"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const client_schema_1 = require("../clients/schemas/client.schema");
const caregiver_schema_1 = require("../caregivers/schemas/caregiver.schema");
const schedule_schema_1 = require("../schedules/schemas/schedule.schema");
const incident_schema_1 = require("../incidents/schemas/incident.schema");
const invoice_schema_1 = require("../billing/schemas/invoice.schema");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: client_schema_1.Client.name, schema: client_schema_1.ClientSchema },
                { name: caregiver_schema_1.Caregiver.name, schema: caregiver_schema_1.CaregiverSchema },
                { name: schedule_schema_1.Schedule.name, schema: schedule_schema_1.ScheduleSchema },
                { name: incident_schema_1.Incident.name, schema: incident_schema_1.IncidentSchema },
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
            ])],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map