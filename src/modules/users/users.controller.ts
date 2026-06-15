import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

@ApiTags('users')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  @Get()
  async findAll(@Query() q: any) {
    const { page = 1, limit = 20, role } = q
    const filter: any = {}
    if (role) filter.role = role
    const [data, total] = await Promise.all([
      this.userModel.find(filter).select('-password').skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.userModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/+limit) }
  }

  @Post()
  async create(@Body() dto: any) {
    const existing = await this.userModel.findOne({ email: dto.email })
    if (existing) throw new Error('User with this email already exists')
    const hash = await bcrypt.hash(dto.password, 12)
    const user = await this.userModel.create({ ...dto, password: hash })
    const { password, ...result } = user.toObject()
    return result
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 12)
    }
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).select('-password')
    return user
  }
}