import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CareNotesService } from './care-notes.service'

@ApiTags('care-notes')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('care-notes')
export class CareNotesController {
  constructor(private readonly svc: CareNotesService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get(':id') getOne(@Param('id') id: string) { return this.svc.findOne(id) }
  @Post() create(@Body() dto: any) { return this.svc.create(dto) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }
  @Post(':id/share') shareWithFamily(@Param('id') id: string) { return this.svc.shareWithFamily(id) }
}
