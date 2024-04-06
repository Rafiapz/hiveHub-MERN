import { IFindAllCommentsUseCase, ICreateCommentUseCase, IDeleteCommentUseCase, IUpdateCommentUseCase } from "../../../domain/useCase/comments";

export interface IUseCases {


    findAllCommentsUseCase: (dependencies: any) => IFindAllCommentsUseCase;
    createCommentUseCase: (dependencies: any) => ICreateCommentUseCase;
    deleteCommentUseCase: (dependencies: any) => IDeleteCommentUseCase;
    updateCommentUseCase: (dependencies: any) => IUpdateCommentUseCase;

}