import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CaregiversService } from './caregivers.service'

@ApiTags('caregivers')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  // Employee portal — get MY caregiver record by logged-in user
  // MUST be before @Get(':id') to avoid conflict
  @Get('me')
  @ApiOperation({ summary: 'Get caregiver profile for logged-in employee' })
  async getMyProfile(@Request() req: any) {
    const userId = req.user._id || req.user.userId || req.user.sub
    const caregiver = await this.caregiversService.findByUserId(userId)
    if (!caregiver) {
      return null // Return null, frontend handles "not linked yet"
    }
    return caregiver
  }

  @Get()
  @ApiOperation({ summary: 'Get all caregivers' })
  getAll(@Query() q: any) { return this.caregiversService.findAll(q) }

  @Get(':id')
  getOne(@Param('id') id: string) { return this.caregiversService.findOne(id) }

  @Post()
  create(@Body() dto: any) { return this.caregiversService.create(dto) }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) { return this.caregiversService.update(id, dto) }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.caregiversService.remove(id) }

  @Post('match')
  @ApiOperation({ summary: 'Find matching caregivers for a client' })
  match(@Body() dto: any) { return this.caregiversService.match(dto) }
}