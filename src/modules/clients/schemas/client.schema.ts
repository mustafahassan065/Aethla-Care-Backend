import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Client extends Document {
  // Link to family portal user
  @Prop({ type: Types.ObjectId, ref: 'User', default: null }) userId?: Types.ObjectId

  @Prop({ required: true }) firstName: string
  @Prop({ required: true }) lastName: string
  @Prop({ required: true }) dateOfBirth: string
  @Prop({ enum: ['male','female','other'] }) gender: string
  @Prop({ required: true }) phone: string
  @Prop() email?: string
  @Prop({ type: Object }) address: {
    street: string; area: string; city: string; country: string;
    coordinates?: { lat: number; lng: number }
  }
  @Prop({ enum: ['active','inactive','pending','discharged'], default: 'pending' }) status: string
  @Prop([String]) careType: string[]
  @Prop([String]) medicalConditions: string[]
  @Prop([String]) allergies: string[]
  @Prop([{ type: Object }]) medications: object[]
  @Prop([{ type: Object }]) emergencyContacts: object[]
  @Prop({ type: Object }) carePlan?: object
  @Prop([String]) assignedCaregivers: string[]
  @Prop() notes?: string
  @Prop({ default: false }) consentSigned: boolean
  @Prop({ type: Object }) insuranceInfo?: object
}

export const ClientSchema = SchemaFactory.createForClass(Client)
ClientSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})
ClientSchema.index({ status: 1, careType: 1 })
ClientSchema.index({ 'address.city': 1 })
ClientSchema.index({ userId: 1 })