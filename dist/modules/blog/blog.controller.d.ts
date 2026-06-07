import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly svc;
    constructor(svc: BlogService);
    getAll(q: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    publish(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
