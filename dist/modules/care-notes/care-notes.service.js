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
exports.CareNotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const care_note_schema_1 = require("./schemas/care-note.schema");
let CareNotesService = class CareNotesService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const { page = 1, limit = 20, clientId, caregiverId } = query;
        const filter = {};
        if (clientId)
            filter.clientId = clientId;
        if (caregiverId)
            filter.caregiverId = caregiverId;
        const [data, total] = await Promise.all([
            this.model.find(filter).populate('clientId', 'firstName lastName').populate('caregiverId').skip((page - 1) * limit).limit(+limit).sort({ visitDate: -1 }),
            this.model.countDocuments(filter),
        ]);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const n = await this.model.findById(id);
        if (!n)
            throw new common_1.NotFoundException('Care note not found');
        return n;
    }
    async create(dto) { return this.model.create(dto); }
    async update(id, dto) {
        const n = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!n)
            throw new common_1.NotFoundException('Care note not found');
        return n;
    }
    async shareWithFamily(id) {
        return this.model.findByIdAndUpdate(id, { familyShared: true }, { new: true });
    }
};
exports.CareNotesService = CareNotesService;
exports.CareNotesService = CareNotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(care_note_schema_1.CareNote.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CareNotesService);
//# sourceMappingURL=care-notes.service.js.map