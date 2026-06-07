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

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'on-leave', 'training'],
    default: 'active',
  })
  status: string

  @Prop({
    type: String,
    enum: ['pending', 'in-progress', 'clear', 'failed'],
    default: 'pending',
  })
  backgroundCheckStatus: string

  @Prop({ type: Number, default: 0 })
  rating: number

  @Prop({ type: Number, default: 0 })
  totalReviews: number

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Client' }], default: [] })
  currentClients: Types.ObjectId[]
}

export const CaregiverSchema = SchemaFactory.createForClass(Caregiver)

// IMPORTANT: Do NOT add any pre-find hooks that auto-populate userId
// This was causing CastError when userId contained full objects instead of ObjectIds
// Population is now handled manually in the service layer