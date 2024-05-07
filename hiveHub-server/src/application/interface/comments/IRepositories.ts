import { DeleteResult } from "mongodb";
import { CommentsEntity } from "../../../domain/entities";
import { ReplyCommentsEntity } from "../../../domain/entities/replyCommentsEntity";
import { CommentsLikesEntity } from "../../../domain/entities/commentsLIkesEntity";


export interface IRepositories {


    findAllComments: (postId: any) => any;
    createComment: (data: any) => any;
    deleteComment: (commentId: string) => Promise<DeleteResult>;
    updateComment: (commentId: any, comment: string) => Promise<CommentsEntity | null>;
    createReplyComment: (data: ReplyCommentsEntity) => Promise<ReplyCommentsEntity | null>;
    findAllReplies: (id: any) => any;
    deleteReplyComment: (id: any) => any;
    commentLike: (data: CommentsLikesEntity) => any;
    findAllCommentLikes: (data: any) => Promise<CommentsLikesEntity[] | []>;
}