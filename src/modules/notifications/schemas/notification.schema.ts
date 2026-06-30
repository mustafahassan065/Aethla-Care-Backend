import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) userId: Types.ObjectId
  @Prop({ required: true }) title:   string
  @Prop({ required: true }) message: string
  @Prop({ default: false }) read:    boolean
  @Prop({ default: 'info', enum: ['info','success','warning','alert'] }) type: string
  @Prop() link?: string
  @Prop() relatedId?: string
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
NotificationSchema.index({ userId: 1, read: 1 })