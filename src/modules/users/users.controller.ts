import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs'

@ApiTags('users')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('Client') private clientModel: Model<any>,
  ) {}

  @Get()
  async findAll(@Query() q: any) {
    const { page = 1, limit = 20, role } = q
    const filter: any = {}
    if (role) filter.role = role

    const users = await this.userModel
      .find(filter)
      .select('-password')
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ createdAt: -1 })

    const total = await this.userModel.countDocuments(filter)

    // For each family user, find linked client
    const data = await Promise.all(users.map(async (u: any) => {
      const userObj = u.toObject()
      if (userObj.role === 'family') {
        const client = await this.clientModel.findOne(
          { userId: userObj._id },
          { firstName: 1, lastName: 1, status: 1 }
        )
        userObj.linkedClient = client || null
      }
      return userObj
    }))

    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  @Get('clients-list')
  async getClientsList() {
    // For dropdown — all clients not yet linked to a family user
    const linkedUserIds = await this.clientModel.distinct('userId', { userId: { $ne: null } })
    const clients = await this.clientModel
      .find({})
      .select('firstName lastName status')
      .sort({ firstName: 1 })
    return clients
  }

  @Post()
  async create(@Body() dto: any) {
    const { clientId, ...userData } = dto

    // Check email unique
    const existing = await this.userModel.findOne({ email: userData.email })
    if (existing) throw new Error('User with this email already exists')

    // Hash password
    const hash = await bcrypt.hash(userData.password, 12)
    const user = await this.userModel.create({ ...userData, password: hash })
    const userObj = user.toObject()
    delete userObj.password

    // If clientId provided, link client to this user
    if (clientId) {
      try {
        await this.clientModel.findByIdAndUpdate(
          new Types.ObjectId(clientId),
          { userId: user._id }
        )
        const client = await this.clientModel.findById(clientId, { firstName: 1, lastName: 1 })
        userObj.linkedClient = client
      } catch (e) {
        // User created but client link failed — not critical
      }
    }

    return userObj
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const { clientId, ...userData } = dto
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12)
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .select('-password')

    // Update client link if clientId provided
    if (clientId) {
      // Remove old link first
      await this.clientModel.updateMany({ userId: new Types.ObjectId(id) }, { $set: { userId: null } })
      // Set new link
      await this.clientModel.findByIdAndUpdate(
        new Types.ObjectId(clientId),
        { userId: new Types.ObjectId(id) }
      )
    }

    return user
  }
}