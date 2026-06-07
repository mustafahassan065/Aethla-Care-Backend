import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true, unique: true }) invoiceNumber: string
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true }) clientId: Types.ObjectId
  @Prop([{ type: Object }]) items: object[]
  @Prop({ required: true, default: 0 }) subtotal: number
  @Prop({ default: 0 }) tax: number
  @Prop({ default: 0 }) discount: number
  @Prop({ required: true }) total: number
  @Prop({ default: 'QAR' }) currency: string
  @Prop({ enum: ['draft','sent','paid','overdue','cancelled'], default: 'draft' }) status: string
  @Prop({ required: true }) dueDate: string
  @Prop() paidAt?: string
  @Prop() paymentMethod?: string
  @Prop() notes?: string
  @Prop({ type: Object }) insuranceClaim?: object
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice)
InvoiceSchema.index({ status: 1, dueDate: 1 })
InvoiceSchema.index({ clientId: 1 })
