import { ICreateLikeUseCase } from "../../domain/useCase/ICreateLikeUseCase";
import { ICreatePostUseCase } from "../../domain/useCase/ICreatePostUseCase";
import { IDeletePostUseCase } from "../../domain/useCase/IDeletePostUseCase";
import { IFindAllPostsUseCase } from "../../domain/useCase/IFindAllPostUseCase";
import { IUPdatePostUseCase } from "../../domain/useCase/IUpdatePostUseCase";
import {IFindAllCommentsUseCase} from '../../domain/useCase/IFindAllCommentsUseCase'
import { ICreateCommentUseCase } from "../../domain/useCase/ICreateCommentUseCase";
import { IDeleteCommentUseCase } from "../../domain/useCase/IDeleteCommentUseCase";


export interface IUseCases{

    createPostUseCase:(dependencies:any)=>ICreatePostUseCase;
    findAllPostsUseCase:(dependencies:any)=>IFindAllPostsUseCase;
    deletePostUseCase:(dependencies:any)=>IDeletePostUseCase;
    updatePostUseCase:(dependencies:any)=>IUPdatePostUseCase;
    likePostUseCase:(dependencies:any)=>ICreateLikeUseCase;
    findAllCommentsUseCase:(dependencies:any)=>IFindAllCommentsUseCase;
    createCommentUseCase:(dependencies:any)=>ICreateCommentUseCase;
    deleteCommentUseCase:(dependencies:any)=>IDeleteCommentUseCase
}