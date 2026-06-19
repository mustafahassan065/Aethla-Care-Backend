import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Patient Signup Request
@Schema({ timestamps: true })
export class PatientSignup extends Document {
  @Prop({ required: true }) firstName: string
  @Prop() lastName: string
  @Prop({ required: true }) email: string
  @Prop() phone: string
  @Prop({ required: true }) password: string
  @Prop({ required: true }) accountType: string // patient, guardian, carer, representative
  @Prop({ default: true }) isSelf: boolean
  @Prop() patientFirstName: string
  @Prop() patientLastName: string
  @Prop() relationship: string
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' }) status: string
  @Prop() adminNotes: string
}

export const PatientSignupSchema = SchemaFactory.createForClass(PatientSignup)

// Employee Signup Request
@Schema({ timestamps: true })
export class EmployeeSignup extends Document {
  @Prop({ required: true }) firstName: string
  @Prop() lastName: string
  @Prop({ required: true }) email: string
  @Prop() phone: string
  @Prop({ required: true }) password: string
  @Prop() specialization: string
  @Prop() licenseNumber: string
  @Prop() experience: string
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' }) status: string
  @Prop() adminNotes: string
}

export const EmployeeSignupSchema = SchemaFactory.createForClass(EmployeeSignup)