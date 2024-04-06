import { DeleteResult } from "mongodb";

export interface IDeleteCommentUseCase{

    execute(commentId:string):Promise<DeleteResult>

}