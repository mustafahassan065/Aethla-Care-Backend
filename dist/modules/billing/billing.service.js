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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_schema_1 = require("./schemas/invoice.schema");
let BillingService = class BillingService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const { page = 1, limit = 20, status, clientId } = query;
        const filter = {};
        if (status && status !== '') {
            filter.status = status;
        }
        if (clientId && clientId !== '' && (0, mongoose_2.isValidObjectId)(clientId)) {
            filter.clientId = new mongoose_2.Types.ObjectId(clientId);
        }
        const [data, total] = await Promise.all([
            this.model
                .find(filter)
                .populate('clientId', 'firstName lastName phone')
                .skip((+page - 1) * +limit)
                .limit(+limit)
                .sort({ createdAt: -1 }),
            this.model.countDocuments(filter),
        ]);
        return {
            data,
            total,
            page: +page,
            limit: +limit,
            totalPages: Math.ceil(total / +limit),
        };
    }
    async findOne(id) {
        const inv = await this.model.findById(id).populate('clientId');
        if (!inv)
            throw new common_1.NotFoundException('Invoice not found');
        return inv;
    }
    async create(dto) {
        const count = await this.model.countDocuments();
        const invoiceNumber = `INV-${String(count + 1).padStart(4, '0')}`;
        return this.model.create({ ...dto, invoiceNumber });
    }
    async update(id, dto) {
        const inv = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!inv)
            throw new common_1.NotFoundException('Invoice not found');
        return inv;
    }
    async sendInvoice(id) {
        return this.model.findByIdAndUpdate(id, { status: 'sent' }, { new: true });
    }
    async getSummary(query) {
        const [totalRevenue, pendingAmount] = await Promise.all([
            this.model.aggregate([
                { $match: { status: 'paid' } },
                { $group: { _id: null, total: { $sum: '$total' } } },
            ]),
            this.model.aggregate([
                { $match: { status: { $in: ['sent', 'overdue'] } } },
                { $group: { _id: null, total: { $sum: '$total' } } },
            ]),
        ]);
        return {
            totalRevenue: totalRevenue[0]?.total || 0,
            pendingAmount: pendingAmount[0]?.total || 0,
        };
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BillingService);
//# sourceMappingURL=billing.service.js.map