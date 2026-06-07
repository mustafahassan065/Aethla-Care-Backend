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
exports.IncidentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const incident_schema_1 = require("./schemas/incident.schema");
let IncidentsService = class IncidentsService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const { page = 1, limit = 20, status, severity } = query;
        const filter = {};
        if (status)
            filter.status = status;
        if (severity)
            filter.severity = severity;
        const [data, total] = await Promise.all([
            this.model.find(filter).skip((page - 1) * limit).limit(+limit).sort({ createdAt: -1 }),
            this.model.countDocuments(filter),
        ]);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const i = await this.model.findById(id);
        if (!i)
            throw new common_1.NotFoundException('Incident not found');
        return i;
    }
    async create(dto) { return this.model.create(dto); }
    async update(id, dto) {
        const i = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!i)
            throw new common_1.NotFoundException('Incident not found');
        return i;
    }
    async resolve(id, dto) {
        return this.model.findByIdAndUpdate(id, { status: 'resolved', resolvedAt: new Date().toISOString(), ...dto }, { new: true });
    }
};
exports.IncidentsService = IncidentsService;
exports.IncidentsService = IncidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(incident_schema_1.Incident.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IncidentsService);
//# sourceMappingURL=incidents.service.js.map