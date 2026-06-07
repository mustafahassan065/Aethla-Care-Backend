import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { MatchingService } from './matching.service'
@ApiTags('matching')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('matching')
export class MatchingController {
  constructor(private readonly svc: MatchingService) {}
  @Post() match(@Body() criteria: any) { return this.svc.match(criteria) }
}
