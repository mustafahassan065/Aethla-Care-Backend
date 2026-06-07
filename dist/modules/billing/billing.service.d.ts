import { Model, Types } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
export declare class BillingService {
    private model;
    constructor(model: Model<Invoice>);
    findAll(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, Invoice, {}, {}> & Invoice & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, {}> & Invoice & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, {}> & Invoice & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, {}> & Invoice & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    sendInvoice(id: string): Promise<import("mongoose").Document<unknown, {}, Invoice, {}, {}> & Invoice & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getSummary(query: any): Promise<{
        totalRevenue: any;
        pendingAmount: any;
    }>;
}
