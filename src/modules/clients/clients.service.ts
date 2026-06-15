import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Client } from './schemas/client.schema'

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, status, careType, search, userId } = query
    const filter: any = {}
    if (status)   filter.status   = status
    if (careType) filter.careType = careType
    if (userId)   filter.userId   = userId
    if (search) filter.$or = [
      { firstName:  { $regex: search, $options: 'i' } },
      { lastName:   { $regex: search, $options: 'i' } },
      { phone:      { $regex: search, $options: 'i' } },
    ]
    const [data, total] = await Promise.all([
      this.clientModel.find(filter).skip((+page - 1) * +limit).limit(+limit).sort({ createdAt: -1 }),
      this.clientModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  // Family portal — get client record linked to this user
  async findByUserId(userId: string) {
    return this.clientModel.findOne({
      userId: new Types.ObjectId(userId)
    })
  }

  async create(dto: any) {
    // If userId provided, convert to ObjectId
    if (dto.userId) {
      try { dto.userId = new Types.ObjectId(dto.userId) } catch { delete dto.userId }
    }
    return this.clientModel.create(dto)
  }

  async update(id: string, dto: any) {
    // If userId provided, convert to ObjectId
    if (dto.userId) {
      try { dto.userId = new Types.ObjectId(dto.userId) } catch { delete dto.userId }
    }
    const client = await this.clientModel.findByIdAndUpdate(id, dto, { new: true })
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  async remove(id: string) {
    return this.clientModel.findByIdAndUpdate(id, { status: 'discharged' }, { new: true })
  }

  async getCarePlan(id: string) {
    const client = await this.findOne(id)
    return client.carePlan || null
  }

  async updateCarePlan(id: string, dto: any) {
    return this.clientModel.findByIdAndUpdate(id, { carePlan: dto }, { new: true })
  }

  async getHistory(id: string) {
    return { clientId: id, notes: [], schedules: [] }
  }
}