import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserRole = 'admin' | 'coordinator' | 'caregiver' | 'family' | 'accountant'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) firstName: string
  @Prop({ required: true }) lastName: string
  @Prop({ required: true, unique: true, lowercase: true }) email: string
  @Prop({ required: true, select: false }) password: string
  @Prop({ required: true }) phone: string
  @Prop({ enum: ['admin','coordinator','caregiver','family','accountant'], default: 'coordinator' }) role: UserRole
  @Prop() avatar?: string
  @Prop({ default: true }) isActive: boolean
  @Prop({ default: false }) isVerified: boolean
  @Prop({ default: false }) mfaEnabled: boolean
  @Prop() lastLoginAt?: Date
  @Prop() passwordResetToken?: string
  @Prop() passwordResetExpires?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})
