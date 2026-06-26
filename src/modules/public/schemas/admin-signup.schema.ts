import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class AdminSignup extends Document {
  @Prop({ required: true }) firstName: string
  @Prop({ required: true }) lastName:  string
  @Prop({ required: true }) email:     string
  @Prop({ required: true }) password:  string
  @Prop({ default: ''    }) phone:     string
  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] }) status: string
}

export const AdminSignupSchema = SchemaFactory.createForClass(AdminSignup)