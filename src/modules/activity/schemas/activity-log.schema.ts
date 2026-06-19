import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class ActivityLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' }) userId: Types.ObjectId
  @Prop() userEmail: string
  @Prop() userRole: string
  @Prop() action: string       // e.g. 'LOGIN', 'CREATE_CLIENT', 'UPDATE_SCHEDULE'
  @Prop() module: string       // e.g. 'clients', 'schedules', 'billing'
  @Prop() description: string  // Human readable
  @Prop({ type: Object }) metadata?: object // Extra data
  @Prop() ipAddress?: string
  @Prop({ enum: ['success', 'warning', 'error'], default: 'success' }) level: string
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog)
ActivityLogSchema.index({ createdAt: -1 })
ActivityLogSchema.index({ userId: 1, createdAt: -1 })
ActivityLogSchema.index({ module: 1, createdAt: -1 })