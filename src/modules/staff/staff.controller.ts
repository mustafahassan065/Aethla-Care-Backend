import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { StaffService } from './staff.service'
@ApiTags('staff')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('staff')
export class StaffController {
  constructor(private readonly svc: StaffService) {}
  @Get() getAll(@Query() q: any) { return this.svc.findAll(q) }
  @Get('on-duty') getOnDuty() { return this.svc.getOnDuty() }
}
