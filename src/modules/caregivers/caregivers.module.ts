import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CaregiversController } from './caregivers.controller'
import { CaregiversService } from './caregivers.service'
import { Caregiver, CaregiverSchema } from './schemas/caregiver.schema'
import { User, UserSchema } from '../users/schemas/user.schema' // Add this import

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Caregiver.name, schema: CaregiverSchema },
      { name: User.name, schema: UserSchema }, // Add User schema
    ])
  ],
  controllers: [CaregiversController],
  providers: [CaregiversService],
  exports: [CaregiversService],
})
export class CaregiversModule {}