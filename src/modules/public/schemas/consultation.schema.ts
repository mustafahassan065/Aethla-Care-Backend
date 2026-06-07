import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Consultation extends Document {
  @Prop({ required: true }) firstName: string
  @Prop({ required: true }) lastName: string
  @Prop({ required: true }) phone: string
  @Prop({ required: true }) email: string
  @Prop({ required: true }) service: string
  @Prop({ required: true }) location: string
  @Prop() message?: string
  @Prop({ enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' }) status: string
  @Prop() notes?: string
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation)