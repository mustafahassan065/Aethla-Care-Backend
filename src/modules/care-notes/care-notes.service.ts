import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CareNote } from './schemas/care-note.schema'

@Injectable()
export class CareNotesService {
  constructor(@InjectModel(CareNote.name) private model: Model<CareNote>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, clientId, caregiverId } = query
    const filter: any = {}
    if (clientId) filter.clientId = clientId
    if (caregiverId) filter.caregiverId = caregiverId
    const [data, total] = await Promise.all([
      this.model.find(filter).populate('clientId', 'firstName lastName').populate('caregiverId').skip((page-1)*limit).limit(+limit).sort({ visitDate: -1 }),
      this.model.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/limit) }
  }

  async findOne(id: string) {
    const n = await this.model.findById(id)
    if (!n) throw new NotFoundException('Care note not found')
    return n
  }

  async create(dto: any) { return this.model.create(dto) }

  async update(id: string, dto: any) {
    const n = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!n) throw new NotFoundException('Care note not found')
    return n
  }

  async shareWithFamily(id: string) {
    return this.model.findByIdAndUpdate(id, { familyShared: true }, { new: true })
  }
}
