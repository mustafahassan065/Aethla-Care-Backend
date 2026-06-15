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

  // Family portal — get MY client record (linked via userId)
  @Get('me')
  @ApiOperation({ summary: 'Get client record for logged-in family user' })
  async getMyClientRecord(@Request() req: any) {
    const userId = req.user._id || req.user.userId || req.user.sub
    const client = await this.clientsService.findByUserId(userId)
    if (!client) {
      throw new NotFoundException(
        'No client record linked to your account. Please contact your care coordinator.'
      )
    }
    return client
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
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

  @Get(':id/history')
  getHistory(@Param('id') id: string) { return this.clientsService.getHistory(id) }
}