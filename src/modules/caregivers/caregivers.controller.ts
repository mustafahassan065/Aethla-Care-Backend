import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CaregiversService } from './caregivers.service'

@ApiTags('caregivers')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly svc: CaregiversService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get(':id') getOne(@Param('id') id: string) { return this.svc.findOne(id) }
  @Post() create(@Body() dto: any) { return this.svc.create(dto) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id) }
  @Post('match') match(@Body() criteria: any) { return this.svc.matchCaregiver(criteria) }
  @Get(':id/schedule') getSchedule(@Param('id') id: string, @Query() q: any) { return this.svc.getSchedule(id, q) }
}
