import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BlogPostDocument = BlogPost & Document

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true }) title: string
  @Prop({ required: true, unique: true }) slug: string
  @Prop({ required: true }) category: string
  @Prop({ required: true }) excerpt: string
  @Prop({ required: true }) content: string
  @Prop() featuredImage?: string
  @Prop({ default: 5 }) readTime: number
  @Prop({ default: false }) published: boolean
  @Prop() publishedAt?: Date
  @Prop({ default: 0 }) views: number
  @Prop() author?: string
  @Prop() seoTitle?: string
  @Prop() seoDescription?: string
  @Prop() tags?: string[]
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)

// Index for faster queries
BlogPostSchema.index({ slug: 1 }, { unique: true })
BlogPostSchema.index({ published: 1, publishedAt: -1 })
BlogPostSchema.index({ category: 1 })