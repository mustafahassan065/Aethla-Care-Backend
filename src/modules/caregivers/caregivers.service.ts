import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Caregiver } from './schemas/caregiver.schema'

@Injectable()
export class CaregiversService {
  constructor(@InjectModel(Caregiver.name) private caregiverModel: Model<Caregiver>) {}

  // Employee portal — find caregiver by logged-in user's ID
  async findByUserId(userId: string) {
    try {
      return await this.caregiverModel
        .findOne({ userId: new Types.ObjectId(userId) })
        .populate('userId', 'firstName lastName email phone')
    } catch {
      return null
    }
  }

  async findAll(query: any) {
    const { page = 1, limit = 20, status, specialization, search, userId } = query
    const filter: any = {}
    if (status)        filter.status         = status
    if (specialization) filter.specializations = specialization
    if (userId)        filter.userId         = new Types.ObjectId(userId)
    if (search) {
      // Search in populated user fields via aggregation — simple filter here
      filter.$or = [
        { licenseNumber: { $regex: search, $options: 'i' } },
      ]
    }
    const [data, total] = await Promise.all([
      this.caregiverModel
        .find(filter)
        .populate('userId', 'firstName lastName email phone')
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ createdAt: -1 }),
      this.caregiverModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const cg = await this.caregiverModel.findById(id).populate('userId', 'firstName lastName email phone')
    if (!cg) throw new NotFoundException('Caregiver not found')
    return cg
  }

  async create(dto: any) {
    if (dto.userId) {
      try { dto.userId = new Types.ObjectId(dto.userId) } catch { delete dto.userId }
    }
    return this.caregiverModel.create(dto)
  }

  async update(id: string, dto: any) {
    const cg = await this.caregiverModel.findByIdAndUpdate(id, dto, { new: true })
      .populate('userId', 'firstName lastName email phone')
    if (!cg) throw new NotFoundException('Caregiver not found')
    return cg
  }

  async remove(id: string) {
    return this.caregiverModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true })
  }

  async match(criteria: any) {
    const { careType, languages, genderPreference, experience } = criteria
    const filter: any = { status: 'active' }
    if (careType)   filter.specializations = { $in: [careType] }
    if (languages?.length) filter.languages = { $in: languages }
    if (experience) filter.experience = { $gte: +experience }

    const caregivers = await this.caregiverModel
      .find(filter)
      .populate('userId', 'firstName lastName email phone')
      .limit(20)

    // Score each caregiver
    const scored = caregivers.map(cg => {
      let score = 60 // base
      if (careType && cg.specializations?.includes(careType)) score += 20
      if (languages?.length) {
        const matched = languages.filter((l: string) => cg.languages?.includes(l)).length
        score += matched * 5
      }
      if (cg.rating > 4) score += 10
      if (cg.backgroundCheckStatus === 'clear') score += 5
      return { caregiver: cg, matchScore: Math.min(score, 100) }
    })

    return scored.sort((a, b) => b.matchScore - a.matchScore)
  }
}