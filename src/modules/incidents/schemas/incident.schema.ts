import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
@Schema({ timestamps: true })
export class Incident extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Caregiver', required: true }) caregiverId: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Schedule' }) scheduleId?: Types.ObjectId
  @Prop({ enum: ['fall','medication-error','behavioral','medical','property','other'] }) type: string
  @Prop({ enum: ['low','medium','high','critical'] }) severity: string
  @Prop({ required: true }) description: string
  @Prop({ required: true }) actionTaken: string
  @Prop([String]) reportedTo: string[]
  @Prop({ default: false }) followUpRequired: boolean
  @Prop() followUpNotes?: string
  @Prop({ enum: ['open','investigating','resolved','closed'], default: 'open' }) status: string
  @Prop() resolvedAt?: string
}
export const IncidentSchema = SchemaFactory.createForClass(Incident)
