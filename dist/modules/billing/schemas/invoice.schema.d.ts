import { Document, Types } from 'mongoose';
export declare class Invoice extends Document {
    invoiceNumber: string;
    clientId: Types.ObjectId;
    items: object[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    currency: string;
    status: string;
    dueDate: string;
    paidAt?: string;
    paymentMethod?: string;
    notes?: string;
    insuranceClaim?: object;
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, Document<unknown, any, Invoice, any, {}> & Invoice & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, Document<unknown, {}, import("mongoose").FlatRecord<Invoice>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Invoice> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
