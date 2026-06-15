import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PublicController } from './public.controller'
import { PublicService } from './public.service'
import { BlogPost, BlogPostSchema } from '../blog/schemas/blog-post.schema'
import { Consultation, ConsultationSchema } from './schemas/consultation.schema'
import { CareerApplication, CareerApplicationSchema } from './schemas/career-application.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name,          schema: BlogPostSchema          },
      { name: Consultation.name,      schema: ConsultationSchema      },
      { name: CareerApplication.name, schema: CareerApplicationSchema },
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}