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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_schema_1 = require("./schemas/schedule.schema");
let SchedulesService = class SchedulesService {
    constructor(scheduleModel) {
        this.scheduleModel = scheduleModel;
    }
    async populateCaregiverUser(schedules) {
        const db = this.scheduleModel.db;
        for (const schedule of schedules) {
            const cg = schedule.caregiverId;
            if (!cg || typeof cg !== 'object')
                continue;
            const userId = cg.userId;
            if (!userId)
                continue;
            try {
                const user = await db.collection('users').findOne({ _id: new mongoose_2.Types.ObjectId(userId.toString()) }, { projection: { password: 0 } });
                if (user) {
                    cg.userId = user;
                }
            }
            catch {
            }
        }
        return schedules;
    }
    async findAll(query) {
        const { page = 1, limit = 50, date, status, caregiverId, clientId } = query;
        const filter = {};
        if (date && date !== '')
            filter.date = date;
        if (status && status !== '')
            filter.status = status;
        if (caregiverId && /^[a-fA-F0-9]{24}$/.test(caregiverId))
            filter.caregiverId = caregiverId;
        if (clientId && /^[a-fA-F0-9]{24}$/.test(clientId))
            filter.clientId = clientId;
        const [rawData, total] = await Promise.all([
            this.scheduleModel
                .find(filter)
                .populate('clientId', 'firstName lastName phone')
                .populate('caregiverId')
                .skip((+page - 1) * +limit)
                .limit(+limit)
                .sort({ date: 1, startTime: 1 })
                .lean(),
            this.scheduleModel.countDocuments(filter),
        ]);
        const data = await this.populateCaregiverUser(rawData);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) };
    }
    async findOne(id) {
        const raw = await this.scheduleModel
            .findById(id)
            .populate('clientId', 'firstName lastName phone address emergencyContacts')
            .populate('caregiverId')
            .lean();
        if (!raw)
            throw new common_1.NotFoundException('Schedule not found');
        const [result] = await this.populateCaregiverUser([raw]);
        return result;
    }
    async create(dto) {
        return this.scheduleModel.create(dto);
    }
    async update(id, dto) {
        const s = await this.scheduleModel.findByIdAndUpdate(id, dto, { new: true });
        if (!s)
            throw new common_1.NotFoundException('Schedule not found');
        return s;
    }
    async remove(id) {
        return this.scheduleModel.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    }
    async checkIn(id, location) {
        return this.scheduleModel.findByIdAndUpdate(id, { status: 'in-progress', checkInTime: new Date().toISOString(), checkInLocation: location }, { new: true });
    }
    async checkOut(id, location) {
        return this.scheduleModel.findByIdAndUpdate(id, { status: 'completed', checkOutTime: new Date().toISOString(), checkOutLocation: location }, { new: true });
    }
    async getCalendar(query) {
        const { startDate, endDate, caregiverId } = query;
        const filter = {};
        if (startDate && endDate)
            filter.date = { $gte: startDate, $lte: endDate };
        if (caregiverId && /^[a-fA-F0-9]{24}$/.test(caregiverId))
            filter.caregiverId = caregiverId;
        const raw = await this.scheduleModel
            .find(filter)
            .populate('clientId', 'firstName lastName')
            .populate('caregiverId')
            .sort({ date: 1, startTime: 1 })
            .lean();
        return this.populateCaregiverUser(raw);
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map