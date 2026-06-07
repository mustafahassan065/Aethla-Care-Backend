import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Client } from '../clients/schemas/client.schema'
import { Caregiver } from '../caregivers/schemas/caregiver.schema'
import { Schedule } from '../schedules/schemas/schedule.schema'
import { Incident } from '../incidents/schemas/incident.schema'
import { Invoice } from '../billing/schemas/invoice.schema'

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Client.name)    private clientModel:    Model<Client>,
    @InjectModel(Caregiver.name) private caregiverModel: Model<Caregiver>,
    @InjectModel(Schedule.name)  private scheduleModel:  Model<Schedule>,
    @InjectModel(Incident.name)  private incidentModel:  Model<Incident>,
    @InjectModel(Invoice.name)   private invoiceModel:   Model<Invoice>,
  ) {}

  async getStats() {
    const today = new Date().toISOString().split('T')[0]
    const [activeClients, staffOnDuty, openIncidents, pendingInvoices, monthRevenue, visitsToday, missedVisits] =
      await Promise.all([
        this.clientModel.countDocuments({ status: 'active' }),
        this.caregiverModel.countDocuments({ status: 'active' }),
        this.incidentModel.countDocuments({ status: { $in: ['open', 'investigating'] } }),
        this.invoiceModel.countDocuments({ status: { $in: ['sent', 'overdue'] } }),
        this.invoiceModel.aggregate([
          { $match: { status: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total' } } },
        ]),
        this.scheduleModel.countDocuments({ date: today }),
        this.scheduleModel.countDocuments({ date: today, status: 'missed' }),
      ])
    return {
      activeClients,
      staffOnDuty,
      openIncidents,
      pendingInvoices,
      monthlyRevenue: monthRevenue[0]?.total || 0,
      satisfactionRate: 98,
      visitsToday,
      missedVisits,
    }
  }

  async getRevenue(query: any) {
    // Aggregate real invoice data by month
    const results = await this.invoiceModel.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: { $substr: ['$createdAt', 0, 7] },
          revenue: { $sum: '$total' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ])

    // Also get schedule counts per month
    const visitResults = await this.scheduleModel.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $substr: ['$date', 0, 7] },
          visits: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ])

    const visitMap: Record<string, number> = {}
    visitResults.forEach((v: any) => { visitMap[v._id] = v.visits })

    const monthNames: Record<string, string> = {
      '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
      '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
      '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
    }

    return results.map((r: any) => ({
      month: monthNames[r._id?.split('-')[1]] || r._id,
      revenue: r.revenue || 0,
      invoiced: r.revenue || 0,
      visits: visitMap[r._id] || 0,
    }))
  }

  async getServiceDistribution() {
    const results = await this.clientModel.aggregate([
      { $match: { status: 'active' } },
      { $unwind: '$careType' },
      { $group: { _id: '$careType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    return results.map((r: any) => ({ service: r._id, count: r.count }))
  }

  async getActivity(query: any) {
    const [recentSchedules, recentIncidents] = await Promise.all([
      this.scheduleModel
        .find({ status: 'completed' })
        .populate('clientId', 'firstName lastName')
        .sort({ updatedAt: -1 })
        .limit(5),
      this.incidentModel.find().sort({ createdAt: -1 }).limit(5),
    ])
    return { schedules: recentSchedules, incidents: recentIncidents }
  }

  async getAlerts() {
    const today = new Date().toISOString().split('T')[0]
    const [overdueInvoices, criticalIncidents, missedVisits] = await Promise.all([
      this.invoiceModel.countDocuments({ status: 'overdue' }),
      this.incidentModel.countDocuments({ severity: 'critical', status: 'open' }),
      this.scheduleModel.countDocuments({ status: 'missed', date: today }),
    ])
    return { overdueInvoices, criticalIncidents, missedVisits }
  }
}