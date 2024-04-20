import { CommentsLikesEntity } from "../../entities/commentsLIkesEntity";

export interface ICommentLikeUseCase {

    execute: (data: CommentsLikesEntity) => any
}