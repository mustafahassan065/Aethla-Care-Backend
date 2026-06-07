import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Caregiver } from './schemas/caregiver.schema'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class CaregiversService {
  constructor(
    @InjectModel(Caregiver.name) private caregiverModel: Model<Caregiver>,
  ) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, status, specialization } = query
    const filter: any = {}
    if (status && status !== '') filter.status = status
    if (specialization) filter.specializations = specialization

    const [data, total] = await Promise.all([
      this.caregiverModel
        .find(filter)
        .populate({
          path: 'userId',
          select: '-password',
        })
        .skip((page - 1) * limit)
        .limit(+limit)
        .sort({ rating: -1 }),
      this.caregiverModel.countDocuments(filter),
    ])

    // Filter out broken records jinka userId ObjectId nahi hai
    const cleanData = data.filter((c: any) => {
      if (!c.userId) return false
      // Agar userId ek object hai (not populated mongoose doc), skip karo
      if (typeof c.userId === 'object' && c.userId !== null && !c.userId._id) return false
      return true
    })

    return {
      data: cleanData,
      total: cleanData.length,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(cleanData.length / limit),
    }
  }

  async findOne(id: string) {
    const c = await this.caregiverModel
      .findById(id)
      .populate({ path: 'userId', select: '-password' })
    if (!c) throw new NotFoundException('Caregiver not found')
    return c
  }

  async create(dto: any) {
    // Agar _userData hai to pehle User banao, phir Caregiver
    if (dto._userData) {
      const UserModel = this.caregiverModel.db.model('User')
      const hashedPassword = await bcrypt.hash('Caregiver@2024!', 12)

      const newUser = await UserModel.create({
        firstName:  dto._userData.firstName,
        lastName:   dto._userData.lastName,
        email:      dto._userData.email,
        phone:      dto._userData.phone,
        role:       dto._userData.role || 'caregiver',
        password:   hashedPassword,
        isActive:   true,
        isVerified: false,
      })

      // _userData hata ke sirf caregiver data rakho
      const { _userData, ...caregiverData } = dto

      return this.caregiverModel.create({
        ...caregiverData,
        userId: newUser._id,
      })
    }

    // Normal create (userId already provided)
    return this.caregiverModel.create(dto)
  }

  async update(id: string, dto: any) {
    const c = await this.caregiverModel.findByIdAndUpdate(id, dto, { new: true })
    if (!c) throw new NotFoundException('Caregiver not found')
    return c
  }

  async remove(id: string) {
    return this.caregiverModel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true },
    )
  }

  async matchCaregiver(criteria: any) {
    const { careType, languages, genderPreference } = criteria
    const filter: any = { status: 'active', backgroundCheckStatus: 'clear' }
    if (careType) filter.specializations = { $in: [careType] }
    if (languages?.length) filter.languages = { $in: languages }
    if (genderPreference && genderPreference !== 'any') {
      filter.genderPreference = { $in: [genderPreference, 'any'] }
    }

    const matches = await this.caregiverModel
      .find(filter)
      .populate({ path: 'userId', select: '-password' })
      .sort({ rating: -1 })
      .limit(5)

    return matches.map((c) => ({
      caregiver: c,
      matchScore: Math.floor(75 + Math.random() * 25),
    }))
  }

  async getSchedule(id: string, query: any) {
    return { caregiverId: id, shifts: [] }
  }

  // Database mein broken records clean karo
  async cleanBrokenRecords() {
    const all = await this.caregiverModel.find({})
    let deleted = 0

    for (const c of all) {
      const userId = c.userId
      // Agar userId ek plain object hai (not valid ObjectId), delete karo
      if (
        userId &&
        typeof userId === 'object' &&
        !Array.isArray(userId) &&
        !(userId as any).toString().match(/^[a-fA-F0-9]{24}$/)
      ) {
        await this.caregiverModel.findByIdAndDelete(c._id)
        deleted++
      }
    }

    return { message: `Cleaned ${deleted} broken records` }
  }
}