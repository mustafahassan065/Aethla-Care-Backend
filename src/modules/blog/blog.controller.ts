import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { BlogService } from './blog.service'
@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly svc: BlogService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get(':slug') getBySlug(@Param('slug') slug: string) { return this.svc.findBySlug(slug) }
  @UseGuards(AuthGuard('jwt')) @ApiBearerAuth('JWT')
  @Post() create(@Body() dto: any) { return this.svc.create(dto) }
  @UseGuards(AuthGuard('jwt')) @ApiBearerAuth('JWT')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }
  @UseGuards(AuthGuard('jwt')) @ApiBearerAuth('JWT')
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id) }
  @UseGuards(AuthGuard('jwt')) @ApiBearerAuth('JWT')
  @Post(':id/publish') publish(@Param('id') id: string) { return this.svc.publish(id) }
}
