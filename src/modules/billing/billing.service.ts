import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, isValidObjectId } from 'mongoose'
import { Invoice } from './schemas/invoice.schema'

@Injectable()
export class BillingService {
  constructor(@InjectModel(Invoice.name) private model: Model<Invoice>) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, status, clientId } = query
    const filter: any = {}

    if (status && status !== '') {
      filter.status = status
    }

    // CRITICAL: clientId sirf valid ObjectId ho to add karo
    if (clientId && clientId !== '' && isValidObjectId(clientId)) {
      filter.clientId = new Types.ObjectId(clientId)
    }

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate('clientId', 'firstName lastName phone')
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ])

    return {
      data,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
    }
  }

  async findOne(id: string) {
    const inv = await this.model.findById(id).populate('clientId')
    if (!inv) throw new NotFoundException('Invoice not found')
    return inv
  }

  async create(dto: any) {
    const count = await this.model.countDocuments()
    const invoiceNumber = `INV-${String(count + 1).padStart(4, '0')}`
    return this.model.create({ ...dto, invoiceNumber })
  }

  async update(id: string, dto: any) {
    const inv = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!inv) throw new NotFoundException('Invoice not found')
    return inv
  }

  async sendInvoice(id: string) {
    return this.model.findByIdAndUpdate(id, { status: 'sent' }, { new: true })
  }

  async getSummary(query: any) {
    const [totalRevenue, pendingAmount] = await Promise.all([
      this.model.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      this.model.aggregate([
        { $match: { status: { $in: ['sent', 'overdue'] } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
    ])
    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingAmount: pendingAmount[0]?.total || 0,
    }
  }
}