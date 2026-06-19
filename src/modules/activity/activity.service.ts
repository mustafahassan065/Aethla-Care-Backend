import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ActivityLog } from './schemas/activity-log.schema'

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(ActivityLog.name) private logModel: Model<ActivityLog>
  ) {}

  async log(data: {
    userId?: string
    userEmail?: string
    userRole?: string
    action: string
    module: string
    description: string
    metadata?: object
    ipAddress?: string
    level?: 'success' | 'warning' | 'error'
  }) {
    try {
      await this.logModel.create({
        userId:      data.userId ? new Types.ObjectId(data.userId) : undefined,
        userEmail:   data.userEmail,
        userRole:    data.userRole,
        action:      data.action,
        module:      data.module,
        description: data.description,
        metadata:    data.metadata,
        ipAddress:   data.ipAddress,
        level:       data.level || 'success',
      })
    } catch {
      // Never throw — logging should never break main flow
    }
  }

  async findAll(query: any) {
    const { page = 1, limit = 50, module, userRole, level, userId } = query
    const filter: any = {}
    if (module)   filter.module   = module
    if (userRole) filter.userRole = userRole
    if (level)    filter.level    = level
    if (userId)   filter.userId   = new Types.ObjectId(userId)

    const [data, total] = await Promise.all([
      this.logModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      this.logModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async getRecentActivity(limit = 20) {
    return this.logModel.find().sort({ createdAt: -1 }).limit(limit)
  }

  async getStats() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayCount, totalCount, byModule] = await Promise.all([
      this.logModel.countDocuments({ createdAt: { $gte: today } }),
      this.logModel.countDocuments(),
      this.logModel.aggregate([
        { $group: { _id: '$module', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
    ])

    return { todayCount, totalCount, byModule }
  }
}