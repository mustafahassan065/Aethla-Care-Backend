import { Model } from 'mongoose';
import { BlogPost } from '../blog/schemas/blog-post.schema';
import { Consultation } from './schemas/consultation.schema';
export declare class PublicService {
    private blogModel;
    private consultationModel;
    constructor(blogModel: Model<BlogPost>, consultationModel: Model<Consultation>);
    submitConsultation(dto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getConsultations(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, Consultation, {}, {}> & Consultation & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateConsultation(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, Consultation, {}, {}> & Consultation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    submitCareerApp(dto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getBlog(query: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getBlogPost(slug: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
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
}
