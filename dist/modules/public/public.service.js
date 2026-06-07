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
exports.PublicService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_post_schema_1 = require("../blog/schemas/blog-post.schema");
const consultation_schema_1 = require("./schemas/consultation.schema");
let PublicService = class PublicService {
    constructor(blogModel, consultationModel) {
        this.blogModel = blogModel;
        this.consultationModel = consultationModel;
    }
    async submitConsultation(dto) {
        const consultation = await this.consultationModel.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone,
            email: dto.email,
            service: dto.service,
            location: dto.location,
            message: dto.message,
            status: 'new',
        });
        console.log('New consultation request saved:', consultation._id);
        return {
            success: true,
            message: 'Consultation request received. We will contact you within 2 hours.',
        };
    }
    async getConsultations(query) {
        const { page = 1, limit = 20, status } = query;
        const filter = {};
        if (status && status !== '')
            filter.status = status;
        const [data, total] = await Promise.all([
            this.consultationModel
                .find(filter)
                .skip((+page - 1) * +limit)
                .limit(+limit)
                .sort({ createdAt: -1 }),
            this.consultationModel.countDocuments(filter),
        ]);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) };
    }
    async updateConsultation(id, dto) {
        const c = await this.consultationModel.findByIdAndUpdate(id, dto, { new: true });
        if (!c)
            throw new common_1.NotFoundException('Consultation not found');
        return c;
    }
    async submitCareerApp(dto) {
        console.log('New career application:', dto);
        return { success: true, message: 'Application received. We will review and contact you soon.' };
    }
    async getBlog(query) {
        const { page = 1, limit = 9, category } = query;
        const filter = { published: true };
        if (category)
            filter.category = category;
        const [data, total] = await Promise.all([
            this.blogModel.find(filter).select('-content').skip((+page - 1) * +limit).limit(+limit).sort({ publishedAt: -1 }),
            this.blogModel.countDocuments(filter),
        ]);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) };
    }
    async getBlogPost(slug) {
        return this.blogModel.findOneAndUpdate({ slug, published: true }, { $inc: { views: 1 } }, { new: true });
    }
    async getTestimonials() {
        return [
            { name: 'Fatima Al-Mansouri', location: 'Doha', service: 'Elderly Care', rating: 5, text: 'Exceptional service for my mother after hip surgery.' },
            { name: 'Khalid Al-Rashid', location: 'Lusail', service: 'Newborn Care', rating: 5, text: 'Our baby nurse was a lifesaver for first-time parents.' },
            { name: 'Sara Al-Qahtani', location: 'Al Rayyan', service: 'Elderly Care', rating: 5, text: 'The family portal gave me complete peace of mind.' },
        ];
    }
    async getFaqs() {
        return [
            { q: 'What areas do you serve?', a: 'Doha, Lusail, Al Wakrah, Al Rayyan, and surrounding areas of Qatar.' },
            { q: 'How quickly can care begin?', a: 'Within 24-48 hours of assessment. Urgent cases can begin same-day.' },
            { q: 'Are caregivers licensed?', a: 'Yes — all are MoH verified, background checked, and continuously trained.' },
        ];
    }
};
exports.PublicService = PublicService;
exports.PublicService = PublicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_post_schema_1.BlogPost.name)),
    __param(1, (0, mongoose_1.InjectModel)(consultation_schema_1.Consultation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PublicService);
//# sourceMappingURL=public.service.js.map