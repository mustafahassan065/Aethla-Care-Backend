import { PublicService } from './public.service';
export declare class PublicController {
    private readonly svc;
    constructor(svc: PublicService);
    submitConsultation(dto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    submitCareerApp(dto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getBlog(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../blog/schemas/blog-post.schema").BlogPost, {}, {}> & import("../blog/schemas/blog-post.schema").BlogPost & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getBlogPost(slug: string): Promise<import("mongoose").Document<unknown, {}, import("../blog/schemas/blog-post.schema").BlogPost, {}, {}> & import("../blog/schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getTestimonials(): Promise<{
        name: string;
        location: string;
        service: string;
        rating: number;
        text: string;
    }[]>;
    getFaqs(): Promise<{
        q: string;
        a: string;
    }[]>;
    getConsultations(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/consultation.schema").Consultation, {}, {}> & import("./schemas/consultation.schema").Consultation & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateConsultation(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/consultation.schema").Consultation, {}, {}> & import("./schemas/consultation.schema").Consultation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
