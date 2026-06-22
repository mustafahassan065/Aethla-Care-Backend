import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CaregiverDocument = Caregiver & Document

@Schema({ timestamps: true })
export class Caregiver {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  licenseNumber: string

  @Prop()
  licenseExpiry: Date

  @Prop({ type: [String], default: [] })
  specializations: string[]

  @Prop({ type: [String], default: [] })
  languages: string[]

  @Prop({ type: Number, default: 0 })
  experience: number

  @Prop({ type: Number, default: 0 })
  hourlyRate: number

  @Prop()
  bio: string

  @Prop({ type: String, enum: ['active', 'inactive', 'on-leave', 'training'], default: 'active' })
  status: string

  @Prop({ type: String, enum: ['pending', 'in-progress', 'clear', 'failed'], default: 'pending' })
  backgroundCheckStatus: string

  @Prop({ type: Number, default: 0 })
  rating: number

  @Prop({ type: Number, default: 0 })
  totalReviews: number

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Client' }], default: [] })
  currentClients: Types.ObjectId[]

  // Skills — employee adds their own skills list
  @Prop({ type: [String], default: [] })
  skills: string[]

  // Availability — Full-Time, Part-Time, Live-In, Overnight, Weekends, On-Call
  @Prop({ type: [String], default: [] })
  availability: string[]

  // Certifications & Credentials uploads
  @Prop({ type: [{ type: Object }], default: [] })
  certificates: {
    name: string
    data: string       // base64
    uploadedAt: string
  }[]

  // Identification card upload
  @Prop({ type: Object, default: null })
  identificationCard: {
    type: string       // Passport, QID, Driver's Licence etc.
    data: string       // base64
    uploadedAt: string
  }

  // Compliance document statuses
  @Prop() backgroundCheck: string
  @Prop() healthScreening: string
  @Prop() insurance: string
}

export const CaregiverSchema = SchemaFactory.createForClass(Caregiver)

CaregiverSchema.index({ userId: 1 })
CaregiverSchema.index({ status: 1 })
CaregiverSchema.index({ specializations: 1 })

