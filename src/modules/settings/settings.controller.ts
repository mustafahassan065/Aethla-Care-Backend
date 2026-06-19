import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { SettingsService } from './settings.service'

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly svc: SettingsService) {}

  // Public — website reads settings
  @Get()
  get() { return this.svc.get() }

  // Admin — update settings
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  update(@Body() dto: any) { return this.svc.update(dto) }
}