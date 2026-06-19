import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { ActivityService } from './activity.service'

@ApiTags('activity')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll(@Query() q: any) { return this.activityService.findAll(q) }

  @Get('recent')
  getRecent(@Query('limit') limit: string) {
    return this.activityService.getRecentActivity(+limit || 20)
  }

  @Get('stats')
  getStats() { return this.activityService.getStats() }
}