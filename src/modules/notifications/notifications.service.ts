import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Notification } from './schemas/notification.schema'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private model: Model<Notification>
  ) {}

  async create(dto: {
    userId: string
    title: string
    message: string
    type?: string
    link?: string
    relatedId?: string
  }) {
    return this.model.create({
      userId:    new Types.ObjectId(dto.userId),
      title:     dto.title,
      message:   dto.message,
      type:      dto.type    || 'info',
      link:      dto.link,
      relatedId: dto.relatedId,
      read:      false,
    })
  }

  async findForUser(userId: string, limit = 20) {
    return this.model
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
  }

  async markRead(id: string, userId: string) {
    return this.model.findOneAndUpdate(
      { _id: id, userId: new Types.ObjectId(userId) },
      { read: true },
      { new: true }
    )
  }

  async markAllRead(userId: string) {
    return this.model.updateMany(
      { userId: new Types.ObjectId(userId), read: false },
      { read: true }
    )
  }

  async getUnreadCount(userId: string) {
    return this.model.countDocuments({
      userId: new Types.ObjectId(userId),
      read:   false,
    })
  }

  // Notify all admins
  async notifyAdmins(db: any, dto: { title: string; message: string; type?: string; link?: string }) {
    const admins = await db.collection('users').find(
      { role: { $in: ['admin', 'coordinator'] }, isActive: true },
      { projection: { _id: 1 } }
    ).toArray()

    for (const admin of admins) {
      await this.create({ userId: admin._id.toString(), ...dto })
    }
  }
}