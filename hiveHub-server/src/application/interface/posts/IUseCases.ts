import { ICreateLikeUseCase } from "../../../domain/useCase/likes";
import { ICreatePostUseCase, IFindOneUseCase } from "../../../domain/useCase/posts";
import { IDeletePostUseCase } from "../../../domain/useCase/posts";
import { IFindAllPostsUseCase } from "../../../domain/useCase/posts";
import { IUPdatePostUseCase } from "../../../domain/useCase/posts";
import { IFindAllCommentsUseCase } from "../../../domain/useCase/comments";
import { ICreateCommentUseCase } from "../../../domain/useCase/comments";
import { IDeleteCommentUseCase } from "../../../domain/useCase/comments";
import { IFindUsersPostUseCase } from "../../../domain/useCase/posts";
import { IUpdateCommentUseCase } from "../../../domain/useCase/comments";
import { ICreateReportUseCase } from "../../../domain/useCase/reports";


export interface IUseCases {

    createPostUseCase: (dependencies: any) => ICreatePostUseCase;
    findAllPostsUseCase: (dependencies: any) => IFindAllPostsUseCase;
    deletePostUseCase: (dependencies: any) => IDeletePostUseCase;
    updatePostUseCase: (dependencies: any) => IUPdatePostUseCase;
    findUsersPostUseCase: (dependencies: any) => IFindUsersPostUseCase;
    findOneUseCase: (dependencies: any) => IFindOneUseCase;
}