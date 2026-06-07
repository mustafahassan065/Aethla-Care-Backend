import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly svc;
    constructor(svc: BillingService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/invoice.schema").Invoice, {}, {}> & import("./schemas/invoice.schema").Invoice & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/invoice.schema").Invoice, {}, {}> & import("./schemas/invoice.schema").Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/invoice.schema").Invoice, {}, {}> & import("./schemas/invoice.schema").Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/invoice.schema").Invoice, {}, {}> & import("./schemas/invoice.schema").Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    send(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/invoice.schema").Invoice, {}, {}> & import("./schemas/invoice.schema").Invoice & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getSummary(q: any): Promise<{
        totalRevenue: any;
        pendingAmount: any;
    }>;
}
