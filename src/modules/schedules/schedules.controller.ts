import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { SchedulesService } from './schedules.service'

@ApiTags('schedules')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly svc: SchedulesService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get('calendar') getCalendar(@Query() q: any) { return this.svc.getCalendar(q) }
  @Get(':id') getOne(@Param('id') id: string) { return this.svc.findOne(id) }
  @Post() create(@Body() dto: any) { return this.svc.create(dto) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id) }
  @Post(':id/check-in') checkIn(@Param('id') id: string, @Body() body: any) { return this.svc.checkIn(id, body.location) }
  @Post(':id/check-out') checkOut(@Param('id') id: string, @Body() body: any) { return this.svc.checkOut(id, body.location) }
}
