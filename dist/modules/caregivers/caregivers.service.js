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
exports.CaregiversService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const caregiver_schema_1 = require("./schemas/caregiver.schema");
const bcrypt = require("bcryptjs");
let CaregiversService = class CaregiversService {
    constructor(caregiverModel) {
        this.caregiverModel = caregiverModel;
    }
    async findAll(query) {
        const { page = 1, limit = 20, status, specialization } = query;
        const filter = {};
        if (status && status !== '')
            filter.status = status;
        if (specialization)
            filter.specializations = specialization;
        const [data, total] = await Promise.all([
            this.caregiverModel
                .find(filter)
                .populate({
                path: 'userId',
                select: '-password',
            })
                .skip((page - 1) * limit)
                .limit(+limit)
                .sort({ rating: -1 }),
            this.caregiverModel.countDocuments(filter),
        ]);
        const cleanData = data.filter((c) => {
            if (!c.userId)
                return false;
            if (typeof c.userId === 'object' && c.userId !== null && !c.userId._id)
                return false;
            return true;
        });
        return {
            data: cleanData,
            total: cleanData.length,
            page: +page,
            limit: +limit,
            totalPages: Math.ceil(cleanData.length / limit),
        };
    }
    async findOne(id) {
        const c = await this.caregiverModel
            .findById(id)
            .populate({ path: 'userId', select: '-password' });
        if (!c)
            throw new common_1.NotFoundException('Caregiver not found');
        return c;
    }
    async create(dto) {
        if (dto._userData) {
            const UserModel = this.caregiverModel.db.model('User');
            const hashedPassword = await bcrypt.hash('Caregiver@2024!', 12);
            const newUser = await UserModel.create({
                firstName: dto._userData.firstName,
                lastName: dto._userData.lastName,
                email: dto._userData.email,
                phone: dto._userData.phone,
                role: dto._userData.role || 'caregiver',
                password: hashedPassword,
                isActive: true,
                isVerified: false,
            });
            const { _userData, ...caregiverData } = dto;
            return this.caregiverModel.create({
                ...caregiverData,
                userId: newUser._id,
            });
        }
        return this.caregiverModel.create(dto);
    }
    async update(id, dto) {
        const c = await this.caregiverModel.findByIdAndUpdate(id, dto, { new: true });
        if (!c)
            throw new common_1.NotFoundException('Caregiver not found');
        return c;
    }
    async remove(id) {
        return this.caregiverModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
    }
    async matchCaregiver(criteria) {
        const { careType, languages, genderPreference } = criteria;
        const filter = { status: 'active', backgroundCheckStatus: 'clear' };
        if (careType)
            filter.specializations = { $in: [careType] };
        if (languages?.length)
            filter.languages = { $in: languages };
        if (genderPreference && genderPreference !== 'any') {
            filter.genderPreference = { $in: [genderPreference, 'any'] };
        }
        const matches = await this.caregiverModel
            .find(filter)
            .populate({ path: 'userId', select: '-password' })
            .sort({ rating: -1 })
            .limit(5);
        return matches.map((c) => ({
            caregiver: c,
            matchScore: Math.floor(75 + Math.random() * 25),
        }));
    }
    async getSchedule(id, query) {
        return { caregiverId: id, shifts: [] };
    }
    async cleanBrokenRecords() {
        const all = await this.caregiverModel.find({});
        let deleted = 0;
        for (const c of all) {
            const userId = c.userId;
            if (userId &&
                typeof userId === 'object' &&
                !Array.isArray(userId) &&
                !userId.toString().match(/^[a-fA-F0-9]{24}$/)) {
                await this.caregiverModel.findByIdAndDelete(c._id);
                deleted++;
            }
        }
        return { message: `Cleaned ${deleted} broken records` };
    }
};
exports.CaregiversService = CaregiversService;
exports.CaregiversService = CaregiversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(caregiver_schema_1.Caregiver.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CaregiversService);
//# sourceMappingURL=caregivers.service.js.map