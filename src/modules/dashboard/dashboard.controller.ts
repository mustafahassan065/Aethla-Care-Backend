import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { DashboardService } from './dashboard.service'

@ApiTags('dashboard')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get('stats')
  getStats() { return this.svc.getStats() }

  @Get('revenue')
  getRevenue(@Query() q: any) { return this.svc.getRevenue(q) }

  @Get('service-distribution')
  getServiceDistribution() { return this.svc.getServiceDistribution() }

  @Get('activity')
  getActivity(@Query() q: any) { return this.svc.getActivity(q) }

  @Get('alerts')
  getAlerts() { return this.svc.getAlerts() }
}