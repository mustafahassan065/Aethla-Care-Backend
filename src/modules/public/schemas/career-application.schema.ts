import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class CareerApplication extends Document {
  @Prop({ required: true }) firstName: string
  @Prop() lastName: string
  @Prop({ required: true }) email: string
  @Prop({ required: true }) phone: string
  @Prop({ required: true }) role: string
  @Prop() experience: string
  @Prop({ type: [String], default: [] }) availability: string[]
  @Prop() message: string
  @Prop({ enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'new' }) status: string
}

export const CareerApplicationSchema = SchemaFactory.createForClass(CareerApplication)