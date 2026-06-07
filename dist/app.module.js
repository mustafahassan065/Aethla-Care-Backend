"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const clients_module_1 = require("./modules/clients/clients.module");
const caregivers_module_1 = require("./modules/caregivers/caregivers.module");
const schedules_module_1 = require("./modules/schedules/schedules.module");
const care_notes_module_1 = require("./modules/care-notes/care-notes.module");
const billing_module_1 = require("./modules/billing/billing.module");
const incidents_module_1 = require("./modules/incidents/incidents.module");
const messages_module_1 = require("./modules/messages/messages.module");
const blog_module_1 = require("./modules/blog/blog.module");
const staff_module_1 = require("./modules/staff/staff.module");
const matching_module_1 = require("./modules/matching/matching.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const public_module_1 = require("./modules/public/public.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (cfg) => ({
                    uri: cfg.get('MONGODB_URI'),
                    dbName: cfg.get('MONGODB_DB_NAME', 'aethla'),
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            event_emitter_1.EventEmitterModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            caregivers_module_1.CaregiversModule,
            schedules_module_1.SchedulesModule,
            care_notes_module_1.CareNotesModule,
            billing_module_1.BillingModule,
            incidents_module_1.IncidentsModule,
            messages_module_1.MessagesModule,
            blog_module_1.BlogModule,
            staff_module_1.StaffModule,
            matching_module_1.MatchingModule,
            dashboard_module_1.DashboardModule,
            public_module_1.PublicModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map