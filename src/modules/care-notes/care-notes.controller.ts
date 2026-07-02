import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { CareNotesService } from './care-notes.service'

@ApiTags('care-notes')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('care-notes')
export class CareNotesController {
  constructor(private readonly svc: CareNotesService) {}

  @Get()
  findAll(@Query() q: any) { return this.svc.findAll(q) }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.svc.findOne(id) }

  @Post()
  create(@Body() dto: any, @Request() req: any) {
    // Attach the logged-in user id so service can use it
    return this.svc.create({ ...dto, createdBy: req.user._id || req.user.sub })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto) }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.svc.remove(id) }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.svc.uploadPhoto(id, file)
  }
}