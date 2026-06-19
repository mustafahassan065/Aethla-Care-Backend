import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Settings extends Document {
  @Prop({ default: 'Aethla Care' })           companyName: string
  @Prop({ default: '+974 4000 0000' })         phone: string
  @Prop({ default: '+974 6000 0000' })         emergencyPhone: string
  @Prop({ default: 'info@aethlacare.com' })    email: string
  @Prop({ default: '97440000000' })            whatsappNumber: string
  @Prop({ default: 'West Bay, Doha, Qatar' }) address: string
  @Prop({ default: 'QAR' })                   currency: string
  @Prop({ default: 'Asia/Qatar' })            timezone: string
}

export const SettingsSchema = SchemaFactory.createForClass(Settings)