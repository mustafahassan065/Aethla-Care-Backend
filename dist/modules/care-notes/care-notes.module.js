"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareNotesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const care_notes_controller_1 = require("./care-notes.controller");
const care_notes_service_1 = require("./care-notes.service");
const care_note_schema_1 = require("./schemas/care-note.schema");
let CareNotesModule = class CareNotesModule {
};
exports.CareNotesModule = CareNotesModule;
exports.CareNotesModule = CareNotesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: care_note_schema_1.CareNote.name, schema: care_note_schema_1.CareNoteSchema }])],
        controllers: [care_notes_controller_1.CareNotesController],
        providers: [care_notes_service_1.CareNotesService],
        exports: [care_notes_service_1.CareNotesService],
    })
], CareNotesModule);
//# sourceMappingURL=care-notes.module.js.map