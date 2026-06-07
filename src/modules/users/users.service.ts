import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { User } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, role, isActive } = query
    const filter: any = {}
    if (role) filter.role = role
    if (isActive !== undefined) filter.isActive = isActive === 'true'
    const [data, total] = await Promise.all([
      this.userModel.find(filter).skip((page - 1) * limit).limit(+limit).sort({ createdAt: -1 }),
      this.userModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async create(dto: any) {
    const hashed = await bcrypt.hash(dto.password, 12)
    return this.userModel.create({ ...dto, password: hashed })
  }

  async update(id: string, dto: any) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12)
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async remove(id: string) {
    return this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }
}
