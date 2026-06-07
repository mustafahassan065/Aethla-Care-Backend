import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Schedule } from './schemas/schedule.schema'

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  // Helper: caregivers mein userId manually populate karo
  private async populateCaregiverUser(schedules: any[]): Promise<any[]> {
    const db = this.scheduleModel.db

    for (const schedule of schedules) {
      const cg = schedule.caregiverId
      if (!cg || typeof cg !== 'object') continue

      // userId sirf string/ObjectId hai — manually User fetch karo
      const userId = cg.userId
      if (!userId) continue

      try {
        const user = await db.collection('users').findOne(
          { _id: new Types.ObjectId(userId.toString()) },
          { projection: { password: 0 } }
        )
        if (user) {
          cg.userId = user
        }
      } catch {
        // ignore
      }
    }
    return schedules
  }

  async findAll(query: any) {
    const { page = 1, limit = 50, date, status, caregiverId, clientId } = query
    const filter: any = {}
    if (date && date !== '') filter.date = date
    if (status && status !== '') filter.status = status
    if (caregiverId && /^[a-fA-F0-9]{24}$/.test(caregiverId)) filter.caregiverId = caregiverId
    if (clientId && /^[a-fA-F0-9]{24}$/.test(clientId)) filter.clientId = clientId

    const [rawData, total] = await Promise.all([
      this.scheduleModel
        .find(filter)
        .populate('clientId', 'firstName lastName phone')
        .populate('caregiverId')
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ date: 1, startTime: 1 })
        .lean(),
      this.scheduleModel.countDocuments(filter),
    ])

    const data = await this.populateCaregiverUser(rawData)

    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const raw = await this.scheduleModel
      .findById(id)
      .populate('clientId', 'firstName lastName phone address emergencyContacts')
      .populate('caregiverId')
      .lean()

    if (!raw) throw new NotFoundException('Schedule not found')

    const [result] = await this.populateCaregiverUser([raw])
    return result
  }

  async create(dto: any) {
    return this.scheduleModel.create(dto)
  }

  async update(id: string, dto: any) {
    const s = await this.scheduleModel.findByIdAndUpdate(id, dto, { new: true })
    if (!s) throw new NotFoundException('Schedule not found')
    return s
  }

  async remove(id: string) {
    return this.scheduleModel.findByIdAndUpdate(
      id, { status: 'cancelled' }, { new: true }
    )
  }

  async checkIn(id: string, location: any) {
    return this.scheduleModel.findByIdAndUpdate(
      id,
      { status: 'in-progress', checkInTime: new Date().toISOString(), checkInLocation: location },
      { new: true }
    )
  }

  async checkOut(id: string, location: any) {
    return this.scheduleModel.findByIdAndUpdate(
      id,
      { status: 'completed', checkOutTime: new Date().toISOString(), checkOutLocation: location },
      { new: true }
    )
  }

  async getCalendar(query: any) {
    const { startDate, endDate, caregiverId } = query
    const filter: any = {}
    if (startDate && endDate) filter.date = { $gte: startDate, $lte: endDate }
    if (caregiverId && /^[a-fA-F0-9]{24}$/.test(caregiverId)) filter.caregiverId = caregiverId

    const raw = await this.scheduleModel
      .find(filter)
      .populate('clientId', 'firstName lastName')
      .populate('caregiverId')
      .sort({ date: 1, startTime: 1 })
      .lean()

    return this.populateCaregiverUser(raw)
  }
}