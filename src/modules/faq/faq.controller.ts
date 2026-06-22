import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { FAQService } from './faq.service'

@ApiTags('faq')
@Controller('faq')
export class FAQController {
  constructor(private readonly svc: FAQService) {}

  // Public — website reads FAQs
  @Get('public')
  getPublished() { return this.svc.getPublished() }

  // Admin
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  findAll(@Query() q: any) { return this.svc.findAll(q) }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  create(@Body() dto: any) { return this.svc.create(dto) }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  delete(@Param('id') id: string) { return this.svc.delete(id) }
}