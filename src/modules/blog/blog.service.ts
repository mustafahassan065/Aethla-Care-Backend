import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BlogPost } from './schemas/blog-post.schema'

@Injectable()
export class BlogService {
  constructor(@InjectModel(BlogPost.name) private model: Model<BlogPost>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, published, category } = query
    const filter: any = {}
    if (published !== undefined && published !== '') {
      filter.published = published === 'true' || published === true
    }
    if (category) filter.category = category

    const [data, total] = await Promise.all([
      this.model.find(filter).skip((+page - 1) * +limit).limit(+limit).sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const post = await this.model.findById(id)
    if (!post) throw new NotFoundException('Post not found')
    return post
  }

  async findBySlug(slug: string) {
    const post = await this.model.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    )
    if (!post) throw new NotFoundException('Post not found')
    return post
  }

  async create(dto: any) {
    // Check slug unique
    const existing = await this.model.findOne({ slug: dto.slug })
    if (existing) throw new Error('A post with this slug already exists')
    return this.model.create({ ...dto, views: 0, published: false })
  }

  async update(id: string, dto: any) {
    const post = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!post) throw new NotFoundException('Post not found')
    return post
  }

  async publish(id: string) {
    const post = await this.model.findByIdAndUpdate(
      id,
      { published: true, publishedAt: new Date() },
      { new: true }
    )
    if (!post) throw new NotFoundException('Post not found')
    return post
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id)
    return { success: true }
  }

  // Public: get published posts
  async getPublished(query: any) {
    const { page = 1, limit = 9, category } = query
    const filter: any = { published: true }
    if (category) filter.category = category
    const [data, total] = await Promise.all([
      this.model.find(filter).select('-content').skip((+page - 1) * +limit).limit(+limit).sort({ publishedAt: -1 }),
      this.model.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }
}