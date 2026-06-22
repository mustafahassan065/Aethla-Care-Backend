import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FAQ } from './schemas/faq.schema'

@Injectable()
export class FAQService {
  constructor(@InjectModel(FAQ.name) private model: Model<FAQ>) {}

  async findAll(query: any = {}) {
    const { published } = query
    const filter: any = {}
    if (published !== undefined && published !== '') filter.published = published === 'true'
    return this.model.find(filter).sort({ order: 1, createdAt: -1 })
  }

  async getPublished() {
    return this.model.find({ published: true }).sort({ order: 1, createdAt: -1 })
  }

  async create(dto: any) {
    return this.model.create(dto)
  }

  async update(id: string, dto: any) {
    const faq = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!faq) throw new NotFoundException('FAQ not found')
    return faq
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id)
    return { success: true }
  }
}