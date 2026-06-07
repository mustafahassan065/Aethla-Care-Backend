import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { IncidentsService } from './incidents.service'
@ApiTags('incidents')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly svc: IncidentsService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get(':id') getOne(@Param('id') id: string) { return this.svc.findOne(id) }
  @Post() create(@Body() dto: any) { return this.svc.create(dto) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }
  @Post(':id/resolve') resolve(@Param('id') id: string, @Body() dto: any) { return this.svc.resolve(id, dto) }
}
