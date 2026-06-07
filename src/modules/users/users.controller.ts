import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'

@ApiTags('users')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() getAll(@Query() query: any) { return this.usersService.findAll(query) }
  @Get(':id') getOne(@Param('id') id: string) { return this.usersService.findOne(id) }
  @Post() create(@Body() dto: any) { return this.usersService.create(dto) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.usersService.update(id, dto) }
  @Delete(':id') remove(@Param('id') id: string) { return this.usersService.remove(id) }
}
