import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { BlogService } from './blog.service'

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly svc: BlogService) {}

  // Admin: get all posts (with drafts)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  findAll(@Query() q: any) { return this.svc.findAll(q) }

  // Admin: get single post
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  findOne(@Param('id') id: string) { return this.svc.findOne(id) }

  // Admin: create post
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  create(@Body() dto: any) { return this.svc.create(dto) }

  // Admin: update post
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }

  // Admin: publish post
  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  publish(@Param('id') id: string) { return this.svc.publish(id) }

  // Admin: delete post
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  delete(@Param('id') id: string) { return this.svc.delete(id) }
}