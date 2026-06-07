import { Controller, Get, Post, Patch, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { ClientsService } from './clients.service'

@ApiTags('clients')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get() @ApiOperation({ summary: 'Get all clients' })
  getAll(@Query() q: any) { return this.clientsService.findAll(q) }

  @Get(':id') getOne(@Param('id') id: string) { return this.clientsService.findOne(id) }

  @Post() create(@Body() dto: any) { return this.clientsService.create(dto) }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.clientsService.update(id, dto) }

  @Delete(':id') remove(@Param('id') id: string) { return this.clientsService.remove(id) }

  @Get(':id/care-plan') getCarePlan(@Param('id') id: string) { return this.clientsService.getCarePlan(id) }

  @Put(':id/care-plan') updateCarePlan(@Param('id') id: string, @Body() dto: any) { return this.clientsService.updateCarePlan(id, dto) }

  @Get(':id/history') getHistory(@Param('id') id: string) { return this.clientsService.getHistory(id) }
}
