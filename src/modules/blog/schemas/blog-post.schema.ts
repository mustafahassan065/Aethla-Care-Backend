import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
@Schema({ timestamps: true })
export class BlogPost extends Document {
  @Prop({ required: true, unique: true }) slug: string
  @Prop({ required: true }) title: string
  @Prop({ required: true }) excerpt: string
  @Prop({ required: true }) content: string
  @Prop({ required: true }) author: string
  @Prop({ enum: ['elderly-care','parenting','disability','wellness','home-healthcare','insurance'] }) category: string
  @Prop([String]) tags: string[]
  @Prop() featuredImage: string
  @Prop() seoTitle?: string
  @Prop() seoDescription?: string
  @Prop({ default: false }) published: boolean
  @Prop() publishedAt?: string
  @Prop({ default: 5 }) readTime: number
  @Prop({ default: 0 }) views: number
}
export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)
// slug index already in @Prop unique:true
BlogPostSchema.index({ published: 1, publishedAt: -1 })
