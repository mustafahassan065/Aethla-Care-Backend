import { Document } from 'mongoose';
export declare class BlogPost extends Document {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage: string;
    seoTitle?: string;
    seoDescription?: string;
    published: boolean;
    publishedAt?: string;
    readTime: number;
    views: number;
}
export declare const BlogPostSchema: import("mongoose").Schema<BlogPost, import("mongoose").Model<BlogPost, any, any, any, Document<unknown, any, BlogPost, any, {}> & BlogPost & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlogPost, Document<unknown, {}, import("mongoose").FlatRecord<BlogPost>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<BlogPost> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
