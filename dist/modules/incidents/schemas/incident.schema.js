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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentSchema = exports.Incident = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Incident = class Incident extends mongoose_2.Document {
};
exports.Incident = Incident;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Client', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Incident.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Caregiver', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Incident.prototype, "caregiverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Schedule' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Incident.prototype, "scheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['fall', 'medication-error', 'behavioral', 'medical', 'property', 'other'] }),
    __metadata("design:type", String)
], Incident.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['low', 'medium', 'high', 'critical'] }),
    __metadata("design:type", String)
], Incident.prototype, "severity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "actionTaken", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Incident.prototype, "reportedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Incident.prototype, "followUpRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Incident.prototype, "followUpNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['open', 'investigating', 'resolved', 'closed'], default: 'open' }),
    __metadata("design:type", String)
], Incident.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Incident.prototype, "resolvedAt", void 0);
exports.Incident = Incident = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Incident);
exports.IncidentSchema = mongoose_1.SchemaFactory.createForClass(Incident);
//# sourceMappingURL=incident.schema.js.map