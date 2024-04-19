import { IFindAllCommentsUseCase, ICreateCommentUseCase, IDeleteCommentUseCase, IUpdateCommentUseCase, ICreateReplyCommentUseCase, IFindAllRepliesUseCase, IDeleteReplyCommentUseCase } from "../../../domain/useCase/comments";

export interface IUseCases {


    findAllCommentsUseCase: (dependencies: any) => IFindAllCommentsUseCase;
    createCommentUseCase: (dependencies: any) => ICreateCommentUseCase;
    deleteCommentUseCase: (dependencies: any) => IDeleteCommentUseCase;
    updateCommentUseCase: (dependencies: any) => IUpdateCommentUseCase;
    createReplyCommentUseCase: (dependencies: any) => ICreateReplyCommentUseCase;
    findAllRepliesUseCase: (dependencies: any) => IFindAllRepliesUseCase;
    deleteReplyCommentUseCase: (dependencies: any) => IDeleteReplyCommentUseCase;
}