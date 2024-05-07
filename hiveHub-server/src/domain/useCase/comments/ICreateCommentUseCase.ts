import { CommentsEntity } from "../../entities";

export interface ICreateCommentUseCase {

    execute: (data: any) => any
}