import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Incident } from './schemas/incident.schema'
@Injectable()
export class IncidentsService {
  constructor(@InjectModel(Incident.name) private model: Model<Incident>) {}
  async findAll(query: any) {
    const { page=1, limit=20, status, severity } = query
    const filter: any = {}
    if (status) filter.status = status
    if (severity) filter.severity = severity
    const [data, total] = await Promise.all([
      this.model.find(filter).skip((page-1)*limit).limit(+limit).sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/limit) }
  }
  async findOne(id: string) {
    const i = await this.model.findById(id)
    if (!i) throw new NotFoundException('Incident not found')
    return i
  }
  async create(dto: any) { return this.model.create(dto) }
  async update(id: string, dto: any) {
    const i = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!i) throw new NotFoundException('Incident not found')
    return i
  }
  async resolve(id: string, dto: any) {
    return this.model.findByIdAndUpdate(id, { status: 'resolved', resolvedAt: new Date().toISOString(), ...dto }, { new: true })
  }
}
