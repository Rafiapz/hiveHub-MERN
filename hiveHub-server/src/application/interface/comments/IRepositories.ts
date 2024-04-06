import { DeleteResult } from "mongodb";
import { CommentsEntity } from "../../../domain/entities";


export interface IRepositories {


    findAllComments: (postId: any) => any;
    createComment: (data: any) => Promise<CommentsEntity>;
    deleteComment: (commentId: string) => Promise<DeleteResult>;
    updateComment: (commentId: any, comment: string) => Promise<CommentsEntity | null>;


}