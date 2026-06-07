import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Client } from './schemas/client.schema'

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, status, careType, search } = query
    const filter: any = {}
    if (status) filter.status = status
    if (careType) filter.careType = careType
    if (search) filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ]
    const [data, total] = await Promise.all([
      this.clientModel.find(filter).skip((page - 1) * limit).limit(+limit).sort({ createdAt: -1 }),
      this.clientModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  async create(dto: any) { return this.clientModel.create(dto) }

  async update(id: string, dto: any) {
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
    // Returns care notes, schedules etc for client
    return { clientId: id, notes: [], schedules: [] }
  }
}
