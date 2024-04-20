import { CommentsLikesEntity } from "../../entities/commentsLIkesEntity";

export interface IFindAllCommentLikesUseCase {
    execute: (id: any) => Promise<CommentsLikesEntity[] | []>
}