import { Controller, Get, Patch, Param, Query, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { NotificationsService } from './notifications.service'

@ApiTags('notifications')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get()
  getMyNotifications(@Request() req: any, @Query('limit') limit?: string) {
    const userId = req.user._id || req.user.sub
    return this.svc.findForUser(userId, limit ? +limit : 20)
  }

  @Get('unread-count')
  getUnreadCount(@Request() req: any) {
    const userId = req.user._id || req.user.sub
    return this.svc.getUnreadCount(userId).then(count => ({ count }))
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @Request() req: any) {
    const userId = req.user._id || req.user.sub
    return this.svc.markRead(id, userId)
  }

  @Patch('mark-all-read')
  markAllRead(@Request() req: any) {
    const userId = req.user._id || req.user.sub
    return this.svc.markAllRead(userId)
  }
}