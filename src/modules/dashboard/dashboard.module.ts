import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { Client, ClientSchema } from '../clients/schemas/client.schema'
import { Caregiver, CaregiverSchema } from '../caregivers/schemas/caregiver.schema'
import { Schedule, ScheduleSchema } from '../schedules/schemas/schedule.schema'
import { Incident, IncidentSchema } from '../incidents/schemas/incident.schema'
import { Invoice, InvoiceSchema } from '../billing/schemas/invoice.schema'
@Module({
  imports: [MongooseModule.forFeature([
    { name: Client.name, schema: ClientSchema },
    { name: Caregiver.name, schema: CaregiverSchema },
    { name: Schedule.name, schema: ScheduleSchema },
    { name: Incident.name, schema: IncidentSchema },
    { name: Invoice.name, schema: InvoiceSchema },
  ])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
