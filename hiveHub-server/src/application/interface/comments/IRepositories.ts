import { DeleteResult } from "mongodb";
import { CommentsEntity } from "../../../domain/entities";
import { ReplyCommentsEntity } from "../../../domain/entities/replyCommentsEntity";


export interface IRepositories {


    findAllComments: (postId: any) => any;
    createComment: (data: any) => Promise<CommentsEntity>;
    deleteComment: (commentId: string) => Promise<DeleteResult>;
    updateComment: (commentId: any, comment: string) => Promise<CommentsEntity | null>;
    createReplyComment: (data: ReplyCommentsEntity) => Promise<ReplyCommentsEntity | null>;
    findAllReplies: (id: any) => any;
    deleteReplyComment: (id: any) => any
}