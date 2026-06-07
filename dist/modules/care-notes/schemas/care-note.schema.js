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
exports.CareNoteSchema = exports.CareNote = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CareNote = class CareNote extends mongoose_2.Document {
};
exports.CareNote = CareNote;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Schedule' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CareNote.prototype, "scheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Client', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CareNote.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Caregiver', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CareNote.prototype, "caregiverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CareNote.prototype, "visitDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CareNote.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], CareNote.prototype, "tasksCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CareNote.prototype, "observations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['excellent', 'good', 'fair', 'poor'] }),
    __metadata("design:type", String)
], CareNote.prototype, "mood", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], CareNote.prototype, "vitalSigns", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: Object }]),
    __metadata("design:type", Array)
], CareNote.prototype, "medications", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: Object }]),
    __metadata("design:type", Array)
], CareNote.prototype, "incidents", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], CareNote.prototype, "photos", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CareNote.prototype, "voiceNoteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], CareNote.prototype, "familyShared", void 0);
exports.CareNote = CareNote = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CareNote);
exports.CareNoteSchema = mongoose_1.SchemaFactory.createForClass(CareNote);
//# sourceMappingURL=care-note.schema.js.map