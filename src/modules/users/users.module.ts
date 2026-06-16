import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { User, UserSchema } from './schemas/user.schema'
import { Client, ClientSchema } from '../clients/schemas/client.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name,   schema: UserSchema   },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [UsersController],
  exports: [MongooseModule],
})
export class UsersModule {}