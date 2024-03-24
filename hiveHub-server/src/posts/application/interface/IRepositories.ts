import { DeleteResult } from "mongodb";
import { LikesEntity, PostEntity } from "../../domain/entities"
import { CommentsEntity } from "../../domain/entities/commentsEntity";

export interface IRepositories {

    create: (data: PostEntity) => Promise<PostEntity | null>;
    findAllPosts: (data: any) => any;
    deletePost: (data: { _id: string }) => Promise<DeleteResult>;
    updatePost: (data: PostEntity) => Promise<PostEntity | null>;
    createLike: (data: LikesEntity) => any;
    findAllComments: (postId: any) => any;
    createComment:(data:any)=>Promise<CommentsEntity>;
    deleteComment:(commentId:string)=>Promise<DeleteResult>
}