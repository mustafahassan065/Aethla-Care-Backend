import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true }) conversationId: string
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) senderId: Types.ObjectId
  @Prop([{ type: Types.ObjectId, ref: 'User' }]) recipientIds: Types.ObjectId[]
  @Prop({ enum: ['text','image','document','care-note','alert'], default: 'text' }) type: string
  @Prop({ required: true }) content: string
  @Prop([String]) attachments: string[]
  @Prop({ default: false }) isRead: boolean
  @Prop({ default: true }) isEncrypted: boolean
}
export const MessageSchema = SchemaFactory.createForClass(Message)
