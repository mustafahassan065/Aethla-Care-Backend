import { Controller, Get, Post, Patch, Put, Delete, Body, Param, Query, UseGuards, Request, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { ClientsService } from './clients.service'

@ApiTags('clients')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // MUST be before :id routes
  @Get('me')
  @ApiOperation({ summary: 'Get client record for logged-in family user' })
  async getMyClientRecord(@Request() req: any) {
    const userId = req.user._id || req.user.userId || req.user.sub
    const client = await this.clientsService.findByUserId(userId)
    if (!client) {
      throw new NotFoundException('No client record linked to your account. Please contact your care coordinator.')
    }
    return client
  }

  @Get()
  getAll(@Query() q: any) { return this.clientsService.findAll(q) }

  @Get(':id')
  getOne(@Param('id') id: string) { return this.clientsService.findOne(id) }

  @Post()
  create(@Body() dto: any) { return this.clientsService.create(dto) }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) { return this.clientsService.update(id, dto) }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.clientsService.remove(id) }

  @Get(':id/care-plan')
  getCarePlan(@Param('id') id: string) { return this.clientsService.getCarePlan(id) }

  @Put(':id/care-plan')
  updateCarePlan(@Param('id') id: string, @Body() dto: any) { return this.clientsService.updateCarePlan(id, dto) }

  // Assign caregiver to client
  @Post(':id/assign-caregiver')
  @ApiOperation({ summary: 'Assign a caregiver to a client' })
  assignCaregiver(@Param('id') id: string, @Body() body: { caregiverId: string }) {
    return this.clientsService.assignCaregiver(id, body.caregiverId)
  }

  // Remove caregiver from client
  @Delete(':id/caregivers/:caregiverId')
  @ApiOperation({ summary: 'Remove a caregiver from a client' })
  removeCaregiver(@Param('id') id: string, @Param('caregiverId') caregiverId: string) {
    return this.clientsService.removeCaregiver(id, caregiverId)
  }
}