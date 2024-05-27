import { DeleteResult } from "mongodb";
import { PostEntity } from "../../../domain/entities";

export interface IRepositories {

    create: (data: PostEntity) => Promise<PostEntity | null>;
    findAllPosts: (data: any) => any;
    deletePost: (data: { _id: string }) => Promise<DeleteResult>;
    updatePost: (data: PostEntity) => Promise<PostEntity | null>;
    findUsersPost: (id: any) => any;
    findOneAndUpdate: (postId: any) => Promise<PostEntity | null>
    findOne: (id: any) => Promise<PostEntity | null>

}