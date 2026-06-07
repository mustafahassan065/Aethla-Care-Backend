import { Model } from 'mongoose';
import { BlogPost } from './schemas/blog-post.schema';
export declare class BlogService {
    private model;
    constructor(model: Model<BlogPost>);
    findAll(query: any): Promise<{
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
    findBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    publish(id: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
