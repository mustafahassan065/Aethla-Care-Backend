import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Client } from './schemas/client.schema'

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private model: Model<Client>,
  ) {}

  async findAll(query: any) {
    const { page = 1, limit = 200, status, search } = query
    const filter: any = {}
    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName:  new RegExp(search, 'i') },
        { email:     new RegExp(search, 'i') },
      ]
    }

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName' } })
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ])

    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const client = await this.model
      .findById(id)
      .populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName email phone' } })
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  async findByUserId(userId: string) {
    return this.model
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName email phone' } })
  }

  async create(dto: any) {
    // If userId provided, ensure it's ObjectId
    if (dto.userId) {
      try { dto.userId = new Types.ObjectId(dto.userId) } catch {}
    }
    return this.model.create(dto)
  }

  async update(id: string, dto: any) {
    // Handle userId conversion
    if (dto.userId) {
      try { dto.userId = new Types.ObjectId(dto.userId) } catch {}
    }
    // Handle assignedCaregivers conversion
    if (dto.assignedCaregivers && Array.isArray(dto.assignedCaregivers)) {
      dto.assignedCaregivers = dto.assignedCaregivers.map((cid: string) => {
        try { return new Types.ObjectId(cid) } catch { return cid }
      })
    }
    const client = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName' } })
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id)
    return { success: true }
  }

  // Assign caregiver to client
  async assignCaregiver(clientId: string, caregiverId: string) {
    const client = await this.model.findByIdAndUpdate(
      clientId,
      { $addToSet: { assignedCaregivers: new Types.ObjectId(caregiverId) } },
      { new: true }
    ).populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName' } })
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  // Remove caregiver from client
  async removeCaregiver(clientId: string, caregiverId: string) {
    const client = await this.model.findByIdAndUpdate(
      clientId,
      { $pull: { assignedCaregivers: new Types.ObjectId(caregiverId) } },
      { new: true }
    ).populate({ path: 'assignedCaregivers', populate: { path: 'userId', select: 'firstName lastName' } })
    if (!client) throw new NotFoundException('Client not found')
    return client
  }

  async getCarePlan(id: string) {
    const client = await this.model.findById(id)
    if (!client) throw new NotFoundException('Client not found')
    return (client as any).carePlan || {}
  }

  async updateCarePlan(id: string, dto: any) {
    const client = await this.model.findByIdAndUpdate(
      id,
      { carePlan: dto },
      { new: true }
    )
    if (!client) throw new NotFoundException('Client not found')
    return client
  }
}