import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BlogPost } from './schemas/blog-post.schema'
@Injectable()
export class BlogService {
  constructor(@InjectModel(BlogPost.name) private model: Model<BlogPost>) {}
  async findAll(query: any) {
    const { page=1, limit=10, category, published='true' } = query
    const filter: any = {}
    if (published === 'true') filter.published = true
    if (category) filter.category = category
    const [data, total] = await Promise.all([
      this.model.find(filter).select('-content').skip((page-1)*limit).limit(+limit).sort({ publishedAt: -1 }),
      this.model.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/limit) }
  }
  async findBySlug(slug: string) {
    const p = await this.model.findOneAndUpdate({ slug, published: true }, { $inc: { views: 1 } }, { new: true })
    if (!p) throw new NotFoundException('Post not found')
    return p
  }
  async create(dto: any) { return this.model.create(dto) }
  async update(id: string, dto: any) {
    const p = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!p) throw new NotFoundException('Post not found')
    return p
  }
  async remove(id: string) { return this.model.findByIdAndDelete(id) }
  async publish(id: string) {
    return this.model.findByIdAndUpdate(id, { published: true, publishedAt: new Date().toISOString() }, { new: true })
  }
}
