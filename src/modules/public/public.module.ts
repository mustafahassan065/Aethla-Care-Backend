import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PublicController } from './public.controller'
import { PublicService } from './public.service'
import { BlogPost, BlogPostSchema } from '../blog/schemas/blog-post.schema'
import { Consultation, ConsultationSchema } from './schemas/consultation.schema'
import { CareerApplication, CareerApplicationSchema } from './schemas/career-application.schema'
import { PatientSignup, PatientSignupSchema, EmployeeSignup, EmployeeSignupSchema } from './schemas/signup.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { Client, ClientSchema } from '../clients/schemas/client.schema'
import { Caregiver, CaregiverSchema } from '../caregivers/schemas/caregiver.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name,          schema: BlogPostSchema          },
      { name: Consultation.name,      schema: ConsultationSchema      },
      { name: CareerApplication.name, schema: CareerApplicationSchema },
      { name: PatientSignup.name,     schema: PatientSignupSchema     },
      { name: EmployeeSignup.name,    schema: EmployeeSignupSchema    },
      { name: User.name,              schema: UserSchema              },
      { name: Client.name,            schema: ClientSchema            },
      { name: Caregiver.name,         schema: CaregiverSchema         },
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}