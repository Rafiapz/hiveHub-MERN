import { CommentsEntity } from "../entities";

export interface IUpdateCommentUseCase {

    execute: (commentId: any, comment: string) => Promise<CommentsEntity | null>
}