import { Module } from '@nestjs/common'
import { CaregiversModule } from '../caregivers/caregivers.module'
import { MatchingController } from './matching.controller'
import { MatchingService } from './matching.service'
@Module({
  imports: [CaregiversModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
