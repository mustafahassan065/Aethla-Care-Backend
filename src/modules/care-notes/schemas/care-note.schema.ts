import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class CareNote extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Schedule' }) scheduleId: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Caregiver', required: true }) caregiverId: Types.ObjectId
  @Prop({ required: true }) visitDate: string
  @Prop({ required: true }) summary: string
  @Prop([String]) tasksCompleted: string[]
  @Prop({ required: true }) observations: string
  @Prop({ enum: ['excellent','good','fair','poor'] }) mood: string
  @Prop({ type: Object }) vitalSigns?: object
  @Prop([{ type: Object }]) medications: object[]
  @Prop([{ type: Object }]) incidents: object[]
  @Prop([String]) photos: string[]
  @Prop() voiceNoteUrl?: string
  @Prop({ default: false }) familyShared: boolean
}

export const CareNoteSchema = SchemaFactory.createForClass(CareNote)
