import { ICreateLikeUseCase } from "../../domain/useCase/ICreateLikeUseCase";
import { ICreatePostUseCase } from "../../domain/useCase/ICreatePostUseCase";
import { IDeletePostUseCase } from "../../domain/useCase/IDeletePostUseCase";
import { IFindAllPostsUseCase } from "../../domain/useCase/IFindAllPostUseCase";
import { IUPdatePostUseCase } from "../../domain/useCase/IUpdatePostUseCase";


export interface IUseCases{

    createPostUseCase:(dependencies:any)=>ICreatePostUseCase;
    findAllPostsUseCase:(dependencies:any)=>IFindAllPostsUseCase;
    deletePostUseCase:(dependencies:any)=>IDeletePostUseCase;
    updatePostUseCase:(dependencies:any)=>IUPdatePostUseCase;
    likePostUseCase:(dependencies:any)=>ICreateLikeUseCase;
}