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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_post_schema_1 = require("./schemas/blog-post.schema");
let BlogService = class BlogService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const { page = 1, limit = 10, category, published = 'true' } = query;
        const filter = {};
        if (published === 'true')
            filter.published = true;
        if (category)
            filter.category = category;
        const [data, total] = await Promise.all([
            this.model.find(filter).select('-content').skip((page - 1) * limit).limit(+limit).sort({ publishedAt: -1 }),
            this.model.countDocuments(filter),
        ]);
        return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) };
    }
    async findBySlug(slug) {
        const p = await this.model.findOneAndUpdate({ slug, published: true }, { $inc: { views: 1 } }, { new: true });
        if (!p)
            throw new common_1.NotFoundException('Post not found');
        return p;
    }
    async create(dto) { return this.model.create(dto); }
    async update(id, dto) {
        const p = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!p)
            throw new common_1.NotFoundException('Post not found');
        return p;
    }
    async remove(id) { return this.model.findByIdAndDelete(id); }
    async publish(id) {
        return this.model.findByIdAndUpdate(id, { published: true, publishedAt: new Date().toISOString() }, { new: true });
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_post_schema_1.BlogPost.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map