import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { CaregiversModule } from '../caregivers/caregivers.module'
import { StaffController } from './staff.controller'
import { StaffService } from './staff.service'
@Module({
  imports: [UsersModule, CaregiversModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
