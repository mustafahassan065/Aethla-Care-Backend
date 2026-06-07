import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Schedule extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Caregiver', required: true }) caregiverId: Types.ObjectId
  @Prop({ required: true }) date: string
  @Prop({ required: true }) startTime: string
  @Prop({ required: true }) endTime: string
  @Prop({ enum: ['scheduled','confirmed','in-progress','completed','missed','cancelled'], default: 'scheduled' }) status: string
  @Prop({ required: true }) serviceType: string
  @Prop() notes?: string
  @Prop() checkInTime?: string
  @Prop() checkOutTime?: string
  @Prop({ type: Object }) checkInLocation?: object
  @Prop({ type: Object }) checkOutLocation?: object
  @Prop({ type: Types.ObjectId, ref: 'CareNote' }) careNoteId?: Types.ObjectId
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
ScheduleSchema.index({ date: 1, status: 1 })
ScheduleSchema.index({ caregiverId: 1, date: 1 })
ScheduleSchema.index({ clientId: 1, date: 1 })
